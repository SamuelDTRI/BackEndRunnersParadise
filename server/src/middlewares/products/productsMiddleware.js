const validator = require('validator');



const validateProducts = (req, res, next) => {
  const { name, size, brand, price, colors, image } = req.body;
 
  console.log('Name:', name);
  console.log('Size:', size);
  console.log('Brand:', brand);
  console.log('Price:', price);
  console.log('Colors:', colors);
  console.log('Image:', image);
 
  const nameRegex = /^[a-zA-Z0-9 ]{5,18}$/;
  const priceRegex = /^\d+(\.\d{1,2})?$/;
  const brandRegex = /^(nike|adidas|newbalance)$/;
  const colorRegex = /^[a-zA-Z]{3,10}$/;
  const sizeRegex = /^\d+(\.\d{1,2})?$/;
  const imageRegex = /^.*\.(jpg|jpeg|png|gif)$/i;
 
  if (!name || (typeof name !== 'string') || !nameRegex.test(name)) {
    console.log('Validation failed for name')
    return res.status(400).json({ error: "Invalid or Missing Name" });
  }
 
  if (!size || !Array.isArray(size) || !size.every(s => sizeRegex.test(s))) {
    console.log('Validation failed for size')
    return res.status(400).json({ error: "Invalid or Missing Size" });
  }
 
  if (!brand || (typeof brand !== 'string') || !brandRegex.test(brand.toLowerCase())) {
    console.log('Validation failed for brand')
    return res.status(400).json({ error: "Invalid brand" });
  }
 
  if (!price || !priceRegex.test(price)) {
    console.log('Validation failed for price')
    return res.status(400).json({ error: "Invalid or Missing Price" });
  }
 
  if (!colors || !Array.isArray(colors) || !colors.every(c => typeof c === 'string' && colorRegex.test(c))) {
    console.log('Validation failed for color')
    return res.status(400).json({ error: "Invalid or Missing Colors" });
  }
 
  if (!image || !Array.isArray(image) || image.length === 0 || !image.every(img => validator.isURL(img))) {
    console.log('Validation failed for image');
    return res.status(400).json({ error: "Invalid or Missing Image" });
  }
  req.body.size = size.map(s => String(s)); // Convertir los tamaños a números
  req.body.colors = colors; // Utilizar directamente el array de colores
 
  next();
 }
 
 module.exports = validateProducts;