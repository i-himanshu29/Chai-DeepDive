import express from "express";
import {
  registerUser,
  verifyUser,
  loginUser,
  logoutUser,
  userProfile,
  resetPassword,
  forgetPassword,
} from "../controllers/auth.controller.js";
import { isLoggedIn } from "../middleware/auth.middleware.js";


const router = express.Router();

router.post("/register", registerUser);
router.get("/verify/:token",verifyUser);
router.post("/login",loginUser);
router.get("/logout",isLoggedIn,logoutUser);
router.get("/profile",isLoggedIn,userProfile);
router.post("/forgot-password", forgetPassword); 
router.post("/reset-password/:token", resetPassword); 


export default router;
