const axios = require("axios");

const products = async (req,res) => {
    try{
        const response = await axios.get("http://localhost:5000/sneakers")
        const data = response.data;
        const result = data.map( country =>{
            return {
            id:country.cca3,
            name:country.name.common,
            image: country.flags.png,
            continente: Array.isArray(country.continents) ? country.continents.join(", ") : country.continents,
            capital: Array.isArray(country.capital) ? country.capital.join(", ") : (country.capital || 'Valor Predeterminado'),
            subregion: country.subregion,
            area: country.area,
            poblacion: country.population,
          }});
        const dbCountry= await Country.bulkCreate(result)
        console.log("se ingresaron correctamente")
        return  res.status(200).json(dbCountry);
    }catch(error){
        return res.status(500).send(error.message);
    }
}

module.exports = {
    paises
}
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