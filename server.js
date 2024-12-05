const express = require('express');
const mongoose=require('mongoose');
const path= require('path');
const app=express();
const port = 5577;
app.use(express.static(__dirname))
app.use(express.urlencoded({extended:true}))
mongoose.connect("mongodb://localhost:27017/Resta", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
const db= mongoose.connection
db.once('open',()=>{
    console.log("Mongo connected");
})
const userSchema =new  mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        require: true,
        unique: true
    },
    number:{
        type: Number,
        unique: true,
        required: true
    },
    password :{
        type: String,
        required: true
    }
})

const Users= mongoose.model("userdetails",userSchema)

app.get('/',(req,res)=> {
    res.sendFile(path.join(__dirname,'register.html'))

    })
app.post('/post',async(req,res)=>
{
    const {name,email,number,password}= req.body
    const user = new Users({
        name,
        email,
        number,
        password
    })
    await user.save()
    console.log("saved")
    res.sendFile(path.join(__dirname,'home.html'))
})
app.listen(port,()=>
{
    console.log("Serving is running ")
})