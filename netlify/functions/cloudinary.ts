const cloudinary = require('cloudinary').v2;
import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: true
});

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  const file = event.body;

  const res = await cloudinary.api.resources_by_tag('sylwester91', { context: true });

  return {
    statusCode: 200,
    body: JSON.stringify(res)
  };
};

export { handler };
