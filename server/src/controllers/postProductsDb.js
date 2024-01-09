const axios = require("axios");

const products = async (req, res) => {
  try {
    const response = await axios.get("http://localhost:5000/sneakers");
    const apiSneakers = response.data;

    const mappedSneakers = apiSneakers.map((sneaker) => {
      return {
        id: sneaker.id,
        name: sneaker.model,
        size: sneaker.size,
        brand: sneaker.brand,
        price: parseFloat(sneaker.price.replace(",", ".")),
        colors: Array.isArray(sneaker.colors) ? sneaker.colors : [],
        image: Array.isArray(sneaker.image) ? sneaker.image : [],
      };
    });
    const dbSneakers = await Country.bulkCreate(mappedSneakers);
    console.log("se ingresaron correctamente");
    return res.status(200).json(dbSneakers);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  products,
};
/*
const cloudinary = require("cloudinary").v2
const multer = require("multer")

const upload = multer({dest: "uploads"})

upload.single("RunnersParadise"),async(req,res)=>{
    try{
        const result = await cloudinary.uploader.upload(req.file.path)
        product.image = {
            public_id:result.public_id,
            secure_url:result.secure_url
        }
        res.status(200).json(result)
    }catch(error){
        console.log("error",error)
        res.status(400).send(error.message)
    }
}*/
