const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Username and password required" });
  }
  const token = jwt.sign(
    { username },
    process.env.JWT_SECRET || "my_super_secret_key_123",
    { expiresIn: "1d" }
  );
  res.json({ token, username });
});

module.exports = router;