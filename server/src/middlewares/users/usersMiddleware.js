const validateUsers = (req, res, next) => {
    const { name, surName, email, password } = req.body;
    if (!name) return res.status(400).json({ error: "Missing Name" });
    if (!surName) return res.status(400).json({ error: "Missing surName" });
    if (!email) return res.status(400).json({ error: "Missing email" });
    if (!password) return res.status(400).json({ error: "Missing password" });

    const nameRegex = /^[a-zA-Z ]+$/;
    if (!nameRegex.test(name) || !nameRegex.test(surName)) {
        return res.status(400).json({ error: "Name or susrName should only contain letters and spaces" });
    }

    const uppercasePassword = /^(?=.*[A-Z]).{6,12}$/;
    if (!uppercasePassword.test(password)) {
        return res.status(400).json({ error: "Password must contain at least 6 characters or one uppercase letter" });
    }

    const verifyEmail =/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!verifyEmail.test(email)) {
        return res.status(400).json({ error: "Email error" });
    }
    next();
  };
  
  module.exports = validateUsers;