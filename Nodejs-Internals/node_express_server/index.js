import express from "express"

const app = express();

app.get("/",(req,res)=>{
    res.status(200).send("Welcome to Coding Hero")
})
app.get("/about",(req,res)=>{
    res.status(200).send("Welcome to about page")
})
app.get("/contact",(req,res)=>{
    res.status(200).send("Welcome to contact page")
})

app.use((req,res)=>{
    res.status(404).send("404 Not found!");
});

app.listen(3000,()=>{
    console.log(`Server is running on port http://localhost:3000`)
})