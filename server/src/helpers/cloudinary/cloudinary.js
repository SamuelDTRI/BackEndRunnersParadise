const cloudinary = require('cloudinary').v2;

const uploadImage = async  (filePath) =>{
return await cloudinary.uploader.upload(filePath,{
    folder: "RunnersParadise"
})
}

const deleteImage = async  (publicID) =>{
    return await cloudinary.uploader.destroy(publicID)
    }

module.exports = {
    uploadImage,deleteImage
  };