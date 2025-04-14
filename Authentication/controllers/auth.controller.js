import User from "../models/User.model.js";
import crypto from "crypto";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
  //1.get data from body
  // validate the data
  // check if user already register through email
  // create a user in DB
  // create a verifcation token
  // save token in the DB
  // send token as email to user
  // send success status to user
  const { name, username, email, password} = req.body;

  if (!name || !email || !password || !username) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  try {
    const existingUser = await User.findOne({ email });

    console.log(email);

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }
    console.log(existingUser)

    const user = await User.create({
      name,
      username,
      email,
      password,
    });
    console.log("user",user);

    if (!user) {
      return res.status(400).json({
        message: "User not registered",
      });
    }

    const token = crypto.randomBytes(32).toString("hex");
    console.log(token);

    user.verificationToken = token;
    await user.save();

    // send  email
    const transporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST,
      // port: process.env.MAILTRAP_PORT,
      secure: false, // true for port 465, false for other ports
      auth: {
        user: process.env.MAILTRAP_USERNAME,
        pass: process.env.MAILTRAP_PASSWORD,
      },
    });
    const mailOption = {
      from: process.env.MAILTRAP_SENDER_MAIL, // sender address
      to: user.email, // list of receivers
      subject: "Verify your email✔", // Subject line
      text: `Please Click on the following link :
              ${process.env.BASE_URL}/api/v1/users/verify/${token}`, // plain text body
      // html: "<b>Hello world?</b>", // html body
    };

    await transporter.sendMail(mailOption);
    res.status(200).json({
      message: "User registered successfully",
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      message: "User not registered",
      error,
      success: false,
    });
  }
};

const verifyUser = async (req, res) => {
  // get token from url
  // validate
  // find user based on the token
  // if not
  // set isVerified field to true
  // remove verification token
  // save
  // return respnse

  const { token } = req.params;
  console.log(token);

  if (!token) {
    return res.status(400).json({
      message: "invalid token",
    });
  }

  try {
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(400).json({
        message: "Invalid token",
      });
    }
    user.isVerified = true;
    user.verificationToken = undefined;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    res.status(200).json({
      message: "User verified successfully",
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      message: "User not verified",
      error,
      success: false,
    });
  }
};

const loginUser = async (req, res) => {
  // get data from body
  //validate
  // check user in db
  // if not
  // bcrypt for matching password , it also use to encrypt the password
  //validate password
  //token
  // res cookie
  // return res

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    const cookieOptions = {
      httpOnly: false, // Set to false for testing
      secure: false, // Set to false for local development
      sameSite: "lax",
      path: "/",
      maxAge: 24 * 60 * 60 * 1000,
    };

    console.log("Cookie options:", cookieOptions);

    res.cookie("token", token, cookieOptions);

    // Log headers to verify cookie is set
    console.log("Response headers:", res.getHeaders());

    res.status(200).json({
      success: true,
      message: "Login successfully",
      // token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(400).json({
      message: "Login failed",
      error,
      success: false,
    });
  }
};

const logoutUser = async (req, res) => {
  //token null
  //return response
  try {
    // Clear the token cookie
    res.cookie("token", "", {
      httpOnly: false,
      secure: false,
      sameSite: "lax",
      path: "/",
      expires: new Date(0), // This will make the cookie expire immediately
    });
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

const userProfile = async (req, res) => {
  //find user from db
  //if not
  // return res

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
    console.log("Error in profile", error);
    res.status(500).json({
      success: false,
      message: "Error fetching profile",
    });
  }
};

const resetPassword = async (req, res) => {
  //user request from mail
  // generate reset token
  //send reset link via mail
  //user clicks on the link
  //user enter new password
  //update password in db
  //invalidate the token
  // send confirmation
  try {
    // Token from URL params
    const { token } = req.params;

    // New password from request body
    const { password} = req.body;

    // validate
    if (!token || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    try {
      // Find user with valid reset token
      const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() }, // Check if token is not expired
      });

      if (!user) {
        return res.status(400).json({ message: "Invalid or expired token" });
      }

      // Hash the new password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Update user's password and reset token fields
      user.password = hashedPassword;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;

      // Save the updated user
      await user.save();

      res.status(200).json({
        message: "Password reset successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: "Server error",
        error: error.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const forgetPassword = async (req, res) => {
  // Get email from request body
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      message: "Email is required",
    });
  }
  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //  Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");

    //  Set reset token and expiry (valid for 10 minutes)
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 10 * 60 * 1000;

    // Save the user with reset token
    await user.save();

    //  Create reset URL
    const resetURL = `${process.env.BASE_URL}/api/v1/users/reset-password/${resetToken}`;

    //  Configure Nodemailer
    const transporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST,
      port: process.env.MAILTRAP_PORT,
      secure: false, // true for port 465, false for other ports
      auth: {
        user: process.env.MAILTRAP_USERNAME,
        pass: process.env.MAILTRAP_PASSWORD,
      },
    });

    // Email message
    const mailOptions = {
      from: process.env.MAILTRAP_SENDER_MAIL, // sender address
      to: user.email,
      subject: "Password Reset Request",
      html: `<p>Click the link below to reset your password:</p>
               <a href="${resetURL}">${resetURL}</a>
               <p>This link is valid for 10 minutes.</p>`,
    };

    //  Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({
      message: "Reset link sent to email",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export {
  registerUser,
  verifyUser,
  loginUser,
  logoutUser,
  userProfile,
  resetPassword,
  forgetPassword,
};

//change password and reresh-token
