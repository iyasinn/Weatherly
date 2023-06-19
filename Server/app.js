const express = require("express");
const app = express();
const mongoose=require("mongoose");
app.use(express.json());

const mongoURL="mongodb+srv://alexvii:Sunking7@cluster0.hkc9298.mongodb.net/";

mongoose .connect(mongoURL, {
    useNewUrlParser:true,

})
.then(() =>{
    console.log("Connected to Database");
})
.catch((e) => console.log(e));

app.post("/register", async(req,res)=>{
    const{fname,lname,email,password}=req.body;
    try {
        
    } catch (error) {
        
    }
})


app.listen(5000,()=>{
    console.log("Server Started");
});
