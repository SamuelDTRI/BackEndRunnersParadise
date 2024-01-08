
const express = require("express")
const app = express()
require("dotenv").config()
const multer = require("multer")
const cloudinary = require("cloudinary").v2

const upload = multer({dest: "uploads"})

const port = 3000


app.get("/",(req,res) => {
    res.send("prueba")
})

app.post("/upload",upload.single("RunnersParadise"),async(req,res)=>{
    try{
        const result = await cloudinary.uploader.upload(req.file.path)
        res.status(200).json(result)
    }catch(error){
        console.log("error",error)
        res.status(400).send(error.message)
    }
})

app.listen(port,()=>{
    console.log("running in port", port)
})

