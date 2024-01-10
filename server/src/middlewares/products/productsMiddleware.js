const validateProducts = (req, res, next) => {
  const { name, size, price, colors, image } = req.body;
  if (!name) return res.status(400).json({ error: "Missing Name" });
  if (!size) return res.status(400).json({ error: "Missing Size" });
  if (!price) return res.status(400).json({ error: "Missing Price" });
  if (!colors) return res.status(400).json({ error: "Missing Colors" });
  if (!image) return res.status(400).json({ error: "Missing Image" });

  next();
};

module.exports = validateProducts;
