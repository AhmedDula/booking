const multer = require("multer")
const AppError = require("../utils/AppError")

const storage = multer.diskStorage({
    destination : (req,file,cb) => {
        cb(null,"public/")
    },
    filename : (req,file,cb) => {
        cb(null,Date.now() + "-" + file.originalname)
    }
})

const fileFilter = (req,file,cb) => {
    if(file.mimetype.startsWith("image/")) {
        cb(null,true)
    } else {
        cb(new AppError(400,"please upload image only"),null)
    }
}


const upload = multer({
    storage : multer.memoryStorage(),
    fileFilter,
    limits : {
        fileSize : 2 *1024 * 1024
    }
})

module.exports = upload