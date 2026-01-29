import express from "express"
import { getAllUsers, login, logout, register, updateProfile } from "../controllers/userControllers.js";
import { isAuthenticated } from "../middleware/isAuthencitcated.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.put("/profile", isAuthenticated, singleUpload, updateProfile );
router.get("/all-users", getAllUsers)
export default router;