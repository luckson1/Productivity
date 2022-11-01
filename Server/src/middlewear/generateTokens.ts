import jwt from "jsonwebtoken";

const generateToken = (id:string) => {
    return jwt.sign({ id }, process.env.JWT_KEY, { expiresIn: "7d" });
};

const generateRefreshToken = (id:string) => {
    return jwt.sign({ id }, process.env.JWT_KEY, { expiresIn: "30d" });
};

export { generateToken, generateRefreshToken };
