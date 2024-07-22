// import { v2 as cloudinary } from "cloudinary";
const cloudinary = require("cloudinary").v2;

// Replace the export statement with module.exports
module.exports.uploadImage = async (image) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
  const result = await cloudinary.uploader.upload(image, {
    folder: "DiveConnect",
  });
  return result.secure_url;
};
module.exports.deleteImage = async (imageLink) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
  await cloudinary.uploader.destroy("DiveConnect/" + imageLink);
};
