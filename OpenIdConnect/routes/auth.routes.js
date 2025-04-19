import express from "express";
import {
  googleLogin,
  googleCallback,
  // getSigningKey,
  getProfle,
  logout,
  // deleteAccount,
  // getJwksClient,
  // verifyGoogleToken,
} from "../controllers/auth.controller.js";
import isLoggedIn from "../middleware/auth.middleware.js";


const router = express.Router();

// User authentication routes

router.get('/google', googleLogin);
router.get('/google/callback', googleCallback);
// router.get('/jwks-client',getJwksClient);
// router.post('/verify-google-token', verifyGoogleToken);

// User profile and account management
router.get('/profile',isLoggedIn, getProfle);
router.get('/logout',isLoggedIn,logout);
// router.delete('/delete-account',isLoggedIn,deleteAccount);
// router.get('/signing-key', getSigningKey);


export default router;
