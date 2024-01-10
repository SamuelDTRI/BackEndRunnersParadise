const validateUsers = (req, res, next) => {
    const { name, surName, email, password } = req.body;
    if (!name) return res.status(400).json({ error: "Missing Name" });
    if (!surName) return res.status(400).json({ error: "Missing surName" });
    if (!email) return res.status(400).json({ error: "Missing email" });
    if (!password) return res.status(400).json({ error: "Missing password" });
    next();
  };
  
  module.exports = validateUsers;