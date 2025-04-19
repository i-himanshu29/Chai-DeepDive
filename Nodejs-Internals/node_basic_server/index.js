// Step-1: HTTP module ko import karo
const http = require("http");

//Step-2: Server ko create karo
const server = http.createServer((req,res)=>{
    // Step-3: Routing based on URL & Method
    if(req.url === "/" && req.method === "GET"){
        res.writeHead(200,{"Content-Type":"text/plain"});
        res.end("Welcome to the Homa Page!");
    }else if(req.url === "/about" && req.method === "GET"){
        res.writeHead(200,{"Content-Type":"text/plain"});
        res.end("Welcome to the about Page!");
    }else if(req.url === "/contact" && req.method === "GET"){
        res.writeHead(200,{"Content-Type":"text/plain"});
        res.end("Welcome to the contact Page!");
    }else{
        res.writeHead(404,{"Content-Type":"text/plain"});
        res.end("404 NOT Found!");
    }
})

// Step-4:Server ko suno
server.listen(3000,()=>{
    console.log("Server is running on http://localhost:3000");
});