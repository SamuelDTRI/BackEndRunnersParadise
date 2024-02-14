const validateUsers = (req, res, next) => {
    console.log("Validating user data:", req.body);
    const { name, surName, email, password } = req.body;
    if (!name) return res.status(400).json({ error: "Missing Name" });
    if (!email) return res.status(400).json({ error: "Missing email" });
    if (!password) return res.status(400).json({ error: "Missing password" });
  
    const nameRegex = /^[A-Za-zÑñ][a-zñ]+( [A-Za-zÑñ][a-zñ]+)?$/;
  
    if (!nameRegex.test(name)  ) {
      return res.status(400).json({
        error: "Name or surName should only contain letters and spaces",
      });
    }
  
   
  
    const verifyEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/;
    if (!verifyEmail.test(email)) {
      return res.status(400).json({ error: "Email error" });
    }
    next();
  };
  
  module.exports = validateUsers;
