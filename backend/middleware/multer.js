import multer from "multer";

const storage = multer.memoryStorage();

// Must match frontend field "thumbnail"
export const singleUpload = multer({ storage }).single("thumbnail");



