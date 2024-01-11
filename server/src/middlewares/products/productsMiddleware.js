const validateProducts = (req, res, next) => {
  const { name, size, price, colors, image } = req.body;

  const nameRegex = /^[a-zA-Z0-9 ]{5,18}$/; //  letras numeros y espacios entre 5 a 18
  const priceRegex = /^\d+(\.\d{1,2})?$/; //  numeros con hasta dos decimales
  const colorRegex = /^[a-zA-Z]{3,10}$/; //  letras con tamaño de 3 a 10
  const sizeRegex = /^\d+(\.\d{1,2})?$/; //  numeros con hasta dos decimales
  const imageRegex = /^.*\.(jpg|jpeg|png|gif)$/i; //  imagenes con extensiones jpg, jpeg, png o gif :))

  if (!name || !nameRegex.test(name)) return res.status(400).json({ error: "Invalid or Missing Name" });
  if (!size || !size.every(s => sizeRegex.test(s))) return res.status(400).json({ error: "Invalid or Missing Size" });
  if (!price || !priceRegex.test(price)) return res.status(400).json({ error: "Invalid or Missing Price" });
  if (!colors || !colors.every(c => colorRegex.test(c))) return res.status(400).json({ error: "Invalid or Missing Colors" });
  if (!image || !image.every(i => imageRegex.test(i))) return res.status(400).json({ error: "Invalid or Missing Image" });

  next();
};

module.exports = validateProducts;

