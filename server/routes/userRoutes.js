import express from "express";
import { logout, signIn, signUp, updateProfile } from "../controllers/User.Controller.js";
import isAuthenticated from "../middleware/Authenticated.js";
import { singleUpload } from "../middleware/multer.js";

const router =  express.Router();

router.route('/signup').post(singleUpload, signUp);
router.route('/login').post(signIn);
router.route('/logout').get(logout)
router.route('/profile/update').put(isAuthenticated,singleUpload, updateProfile)

export default router;