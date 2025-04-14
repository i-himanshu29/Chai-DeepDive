import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./utils/connectDB.js";

// routes
import userRoutes from "./routes/user.route.js";

const app = express();
const port = process.env.PORT || 4000;
dotenv.config();
// to access cookies
app.use(cookieParser());
// dealing with cors
app.use(
  cors({
    // from where we want the request - frontend
    // origin: process.env.BASE_URL,
    origin:'http://localhost:5173',
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"],
    credentials: true,
    exposedHeaders: ["Set-Cookie", "*"],
  })
);

// for getting the data from json
app.use(express.json());
// from getting the data from URL
app.use(express.urlencoded({extended:true}));

app.use(express.static("public"));

app.get("/", (req, res) => {
  console.log("Request cookies:", req.cookies);
  console.log("Request headers:", {
    cookie: req.headers.cookie,
    origin: req.headers.origin,
  });

  res.json({
    message: "Hello World",
    cookies: req.cookies,
  });
});

// User routes
app.use("/api/v1/users", userRoutes);

// connect to DB
connectDB();

//user routes

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
