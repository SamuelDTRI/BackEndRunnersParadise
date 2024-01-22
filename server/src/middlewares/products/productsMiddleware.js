const validateProducts = (req, res, next) => {
  const { name, size, brand, price, colors, image } = req.body;

  const nameRegex = /^[a-zA-Z0-9 ]{5,18}$/; // letras, números y espacios entre 5 y 18
  const priceRegex = /^\d{1,4}$/; // números con hasta dos decimales
  const brandRegex = /^(nike|adidas|newbalance)$/; // marcas permitidas
  const colorRegex = /^[a-zA-Z]{3,10}$/; // letras con tamaño de 3 a 10
  const sizeRegex = /^\d+(\.\d{1,2})?$/; // números con hasta dos decimales

  // Validar el nombre
  if (!name || !nameRegex.test(name)) {
    return res.status(400).json({ error: "Invalid or Missing Name" });
  }

  // Validar el tamaño
  if (!size || !Array.isArray(size) || !size.every((s) => sizeRegex.test(s))) {
    return res.status(400).json({ error: "Invalid or Missing Size" });
  }

  // Validar la marca
  if (!brand || !brandRegex.test(brand.toLowerCase())) {
    return res.status(400).json({ error: "Invalid Brand" });
  }

  // Validar el precio
  if (!price || !priceRegex.test(price)) {
    return res.status(400).json({ error: "Invalid or Missing Price" });
  }

  // Validar los colores
  if (
    !colors ||
    !Array.isArray(colors) ||
    !colors.every((c) => colorRegex.test(c))
  ) {
    return res.status(400).json({ error: "Invalid or Missing Colors" });
  }

  // Pasar al siguiente middleware si todas las validaciones son exitosas
  next();
};

module.exports = validateProducts;
