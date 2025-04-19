import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors";
import dbconnect from "./utils/dbConnect.js"
import  authRoutes from "./routes/auth.routes.js";

const app = express()
dotenv.config();
//port
const port = process.env.PORT || 5000

// to send the json format data
app.use(express.json());
//to manage url data
app.use(express.urlencoded({extended:true}));
//to access cookies
app.use(cookieParser())
// cors
app.use(
  cors({
    // from where we want the request - frontend
    // origin: "http://localhost:3000",
    // origin:process.env.BASE_URL,
    origin:`http://localhost:${port}`,
    // Credentials
    credentials:true,
    // What type of methods are allowed
    methods:['GET','POST','DELETE','OPTIONS'],
    //allowedHeaders- case Sensitive
    allowedHeaders:['Content-Type','Authorization'],
    
  })
);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// connect to db 
dbconnect();

//routes
app.use("/auth", authRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})