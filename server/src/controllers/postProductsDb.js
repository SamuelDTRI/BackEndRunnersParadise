const cloudinary = require("cloudinary").v2
const multer = require("multer")

const upload = multer({dest: "uploads"})

upload.single("RunnersParadise"),async(req,res)=>{
    try{
        const result = await cloudinary.uploader.upload(req.file.path)
        res.status(200).json(result)
    }catch(error){
        console.log("error",error)
        res.status(400).send(error.message)
    }
}