import type { CloudinaryResources } from '@/types';
import type { Handler, HandlerEvent } from '@netlify/functions';

const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: true
});

const handler: Handler = async (event: HandlerEvent) => {
  const file = event.body;

  const res: CloudinaryResources = await cloudinary.api.resources_by_tag('sylwester91', { context: true, tags: true });

  // To ensure the hero image is always displayed first, we must locate the image tagged as the hero and move it to the top of the resources array.
  const heroResourceIndex = res.resources.findIndex(resource => resource.tags.find(tag => tag === 'hero'));
  const heroResource = res.resources.splice(heroResourceIndex, 1)[0];
  res.resources.splice(0, 0, heroResource);

  return {
    statusCode: 200,
    body: JSON.stringify(res)
  };
};

export { handler };
