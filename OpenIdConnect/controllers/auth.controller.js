import axios from "axios";
import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";
import User from "../models/User.model.js";
import { generateNonce, generateState } from "../utils/auth.utils.js";

// register the user
// const registerUser = async (req, res) => {
//   // get data
//   //validate
//   // check if user already exists
//   // create a user in database
//   //create a verification token
//   // save token in database
//   // send token as email to user
//   // send success status to user

//   const { name, email, password } = req.body;
//   if (!name || !email || !password) {
//     return res.status(400).json({
//       message: "All fields are required",
//     });
//   }

//   try {
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({
//         message: "User already exists",
//       });
//     }

//     const user = await User.create({
//       name,
//       email,
//       password,
//     });
//     console.log(user);

//     if (!user) {
//       return res.status(400).json({
//         message: "User not registered",
//       });
//     }

//     const token = crypto.randomBytes(32).toString("hex");
//     console.log(token);
//     user.verificationToken = token;

//     await user.save();

//     //send email
//     const transporter = nodemailer.createTransport({
//       host: process.env.MAILTRAP_HOST,
//       port: process.env.MAILTRAP_PORT,
//       secure: false, // true for port 465, false for other ports
//       auth: {
//         user: process.env.MAILTRAP_USERNAME,
//         pass: process.env.MAILTRAP_PASSWORD,
//       },
//     });

//     const mailOption = {
//       from: process.env.MAILTRAP_SENDEREMAIL,
//       to: user.email,
//       subject: "Verify your email", // Subject line
//       text: `Please click on the following link:
//       ${process.env.BASE_URL}/api/v1/users/verify/${token}
//       `,
//     };

//     await transporter.sendMail(mailOption);

//     res.status(201).json({
//       message: "User registered successfully",
//       success: true,
//     });
//   } catch (error) {
//     res.status(400).json({
//       message: "User not registered ",
//       error,
//       success: false,
//     });
//   }
// };

// create a JWKS clent for Google's certificate endpoint
const getJwksClient = () => {
  return getJwksClient({
    jwksUri: process.env.GOOGLE_JWKS_URL,
    cache: true,
    rateLimit: true,
  });
};

// function to get the signing key for a given key ID
const getSigningKey = async (kid) => {
  const client = getJwksClient();
  return new Promise((resolve, reject) => {
    client.getSigningKey(kid, (err, key) => {
      if (err) {
        return reject(err);
      }
      const signingKey = key.getPublicKey();
      resolve(signingKey);
    });
  });
};

// function to verify the ID token using the Signing key
const verifyGoogleToken = async (token) => {
  try {
    const decoded = jwt.decode(token, { complete: true });
    if (!decoded) {
      throw new Error("Invalid Error");
    }

    const kid = decoded.header.kid;
    const signingKey = await getSigningKey(kid);

    const verificationToken = jwt.verify(token, signingKey, {
      algorithms: ["RSA256"],
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    console.log(verificationToken)
    return verificationToken;
  } catch (error) {
    throw new Error("token verify failed");
  }
};

// Redirect to google Login
const googleLogin = (req, res) => {
  // genreate security and unko params se uthns hai
  // store in cookies
  // Build auth url
  // redirect google
  const state = generateState();
  const nonce = generateNonce();

  res.cookie("oauth_state", state, {
    httpOnly: true,
    maxAge: 600000,
  });
  res.cookie("oauth", nonce, {
    httpOnly: true,
    maxAge: 600000,
  });

  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}&response_type=code&scope=email%20profile%20openid&state=${state}&nonce=${nonce}`;
  res.redirect(googleAuthUrl);
};

// Handle Google Callback and Exchange Code for Tokens
const googleCallback = async (req, res) => {
  //  extract code and state from query params
  try {
    const { code, state } = req.query;
    const savedState = req.cookies.oauth.state;
    const savedNonce = req.cookies.oauth.nonce;

    res.clearCookie("oauth_state");
    res.clearCookie("oauth_nonce");

    if (!state || !savedState || state !== savedState) {
      return res.status(401).json({ message: "Invalid state" });
    }

    // exchange code for google tokens
    const tokenResponse = await axios.post(
      "https://oauth2.googleapis.com/token",
      null,
      {
        params: {
          client_id: process.env.GOOGLE_CLIENT_ID,
          client_secret: process.env.GOOGLE_CLIENT_SECRET,
          redirect_url: process.env.GOOGLE_REDIRECT_URL,
          code,
          grant_type: "authorization_code",
        },
      }
    );

    const { id_token, access_token, refresh_token } = tokenResponse.data;
    if (!id_token) {
      return res.status(401).json({
        message: "Invalid id token",
      });
    }

    // verify id token
    const decodedToken = await verifyGoogleToken(id_token);

    if (!decodedToken) {
      return res.status(402).json({
        message: "Invalid Id Token",
      });
    }
    // check if nonce matches the one stored in cookie
    if (!decodedToken.nonce || decodedToken.nonce !== savedNonce) {
      return res.status(401).json({
        message: "Invalid nonce parameter",
      });
    }

    // find or create the user in the db
    let user = await User.findOne({ googleId: decodedToken.sub });
    if (!user) {
      user = await User.create({
        googleId: decodedToken.sub,
        email: decodedToken.email,
        name: decodedToken.name,
        refreshToken: refresh_token || null,
      });
    } else if (refresh_token) {
      //update refresh token if it is changes
      user.refreshToken = refresh_token;
      await user.save();
    }
    // generate own jwt token for user
    const accessToken = jwt.sign(
      {
        userID: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.cookie("access_token", accessToken, {
      httpOnly: true,
      maxAge: 3600000,
    });

    res.json({
      message: "Login Successfull",
      use: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Authentication failed",
    });
  }
};

// get User Profile
const getProfle = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    console.log(user);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log("Error in get me", error);
  }
};

// Logout User
const logout = (req, res) => {
  //token null
  //return response
  try {
    res.cookie("token", "", {});
    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    return res.status(400).json({
      message: "logout failed",
      error,
      success: false,
    });
  }
};

// delete account
const deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming authentication middleware attaches user info

    // Find and delete the user
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Account deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

export {
  // registerUser,
  googleLogin,
  googleCallback,
  getSigningKey,
  getProfle,
  logout,
  deleteAccount,
  getJwksClient,
  verifyGoogleToken,
};
