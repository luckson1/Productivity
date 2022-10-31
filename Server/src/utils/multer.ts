import  multer from "multer";
import  { v4 as  uuidv4 } from "uuid";

const DIR = "./public/uploads";

// Multer configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(" ").join("-");

        cb(null, `${uuidv4()}-${fileName}`);
    },
});
const Multer = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype === "image/png" ||
            file.mimetype === "image/jpg" ||
            file.mimetype === "image/jpeg"
        ) {
            console.log("hi");
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
        }
    },
});

export default Multer;
