const express = require('express');
const app = express();
const fs =require ('fs')
const status = require('express-status-monitor');
 const {stream}=require("stream")
 const zlib=require('zlib')
app.use(status());
//convert into zip 
fs.createReadStream('./my.txt').pipe(zlib.createGzip().pipe(fs.createWriteStream('./my.zip')))

fs.createReadStream('./hi.pdf').pipe(zlib.createGzip().pipe(fs.createWriteStream('./hi.zip')))


//read
app.get("/weak",(req,res)=>{
    fs.readFile("./my.txt",(err,data)=>{
        res.end(data)
    })
})

//create a stream
app.get("/streamcheck",(req,res)=>{
    const stream=fs.createReadStream("./hi.pdf");
    stream.on('data',(chunk)=>res.write(chunk))
    stream.on("end",()=>res.end())
})
app.listen(3007 ,()=>{
    console.log("server is running on port 3007")
    })