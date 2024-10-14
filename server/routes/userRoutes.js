import express from "express";
import { logout, signIn, signUp, updateProfile } from "../controllers/User.Controller.js";
import isAuthenticated from "../middleware/Authenticated.js";

const router =  express.Router();

router.route('/signup').post(signUp);
router.route('/signin').post(signIn);
router.route('/logout').get(logout)
router.route('/profile/update').put(isAuthenticated, updateProfile)

export default router;