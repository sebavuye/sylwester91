import type { CloudinaryResourcesByTagResponseDTO, CloudinaryResourcesByTagResponseWithOrderDTO, SortedResourcesData } from '@/types';
import type { NextApiRequest, NextApiResponse } from 'next';

const cloudinary = require('cloudinary').v2;

cloudinary.config({
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  secure: true,
});

const requestTag = 'sylwester91';
const resourceChunkSize = 2;

export default async function handler(request: NextApiRequest, res: NextApiResponse) {
  const response = await cloudinary.api.resources_by_tag(requestTag, { context: true, tags: true });

  const clonedResponse: CloudinaryResourcesByTagResponseDTO = { ...response };
  const responseWithOrder: CloudinaryResourcesByTagResponseWithOrderDTO = {
    ...clonedResponse,
    resources: clonedResponse.resources.map((resource, index) => ({ ...resource, order: index })),
  };

  const verticalResources = responseWithOrder.resources.filter((resource) => resource.height > resource.width);
  const horizontalResources = responseWithOrder.resources.filter((resource) => resource.height < resource.width);

  const verticalResourcesPairs = [];
  for (let i = 0; i < verticalResources.length; i += resourceChunkSize) {
    const chunk = verticalResources.slice(i, i + resourceChunkSize);
    verticalResourcesPairs.push(chunk);
  }

  const sortedResourcesData: SortedResourcesData = {
    ...responseWithOrder,
    resources: [...horizontalResources, ...verticalResourcesPairs].sort((a, b) => {
      const resourceA = Array.isArray(a) ? a[0].order : a.order;
      const resourceB = Array.isArray(b) ? b[0].order : b.order;

      return resourceA - resourceB;
    }),
  };

  const singleVerticalResource = [...sortedResourcesData.resources].filter((resource) => Array.isArray(resource) && resource.length < 2);
  const otherResources = [...sortedResourcesData.resources].filter(
    (resource) => !Array.isArray(resource) || (Array.isArray(resource) && resource.length === 2)
  );

  sortedResourcesData.resources = [...otherResources, ...singleVerticalResource];

  // To ensure the hero image is always displayed first, we must locate the image tagged as the hero and move it to the top of the resources array.
  const heroResourceIndex = sortedResourcesData.resources.findIndex((resource) => {
    if (!Array.isArray(resource)) return resource?.tags?.find((tag) => tag === 'hero');
  });

  const heroResource = sortedResourcesData.resources.splice(heroResourceIndex, 1)[0];
  sortedResourcesData.resources.splice(0, 0, heroResource);

  return res.status(200).json({ ...sortedResourcesData });
}
