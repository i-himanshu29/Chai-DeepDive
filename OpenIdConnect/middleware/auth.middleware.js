import jwt from "jsonwebtoken";

const isLoggedIn = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the user to the request object
    req.user = decoded;
    next();
  } catch (error) {
    console.error("JWT verification error:", error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export default isLoggedIn;




// import jwt from "jsonwebtoken";

// export const isLoggedIn = async (req, res, next) => {
//   try {
//     console.log(req.cookies);
//     let token = req.cookies?.token;

//     console.log("Token Found: ", token ? "YES" : "NO");

//     if (!token) {
//       console.log("NO token");
//       return res.status(401).json({
//         success: false,
//         message: "Authentication failed",
//       });
//     }

//     const decoded = await jwt.verify(token, process.env.JWT_SECRET);
//     console.log("decoded data: ", decoded);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     console.log("Auth middleware failure");
//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// };
