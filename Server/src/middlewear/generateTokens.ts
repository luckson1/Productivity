import jwt from "jsonwebtoken";

const generateToken = (id:string) => {
    return jwt.sign({ id }, process.env.JWT_KEY, { expiresIn: "7s" });
};

const generateRefreshToken = (id:string) => {
    return jwt.sign({ id }, process.env.JWT_KEY, { expiresIn: "14d" });
};

export { generateToken, generateRefreshToken };
