const jwt = require("jsonwebtoken");

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_KEY, { expiresIn: "60s" });
};

const generateRefreshToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_KEY, { expiresIn: "14d" });
};

module.exports = { generateToken, generateRefreshToken };
