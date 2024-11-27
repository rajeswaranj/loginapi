require('dotenv').config();
var express = require("express");
var cors=require('cors')
const helmet = require("helmet")
var cookieParser = require('cookie-parser')
const mongoose=require('mongoose') 
const router = require('./routers/authRouter');

var app = express();


app.use(helmet())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

mongoose.connect('mongodb+srv://bharathikanagaraj:HrAmidvVDcrZX8bX@rrs-demo-mongo-cluster.cibwnno.mongodb.net/rajesh').then(()=>{
    console.log("mongoDB connected")
}).catch(err=>{
    console.log("DB CONNECTION ERROR:::",err)
})

app.use(cors({
    origin:"http://localhost:8000"
}))

app.use('/api/auth',router)

app.get("/url", (req, res, next) => { 
    res.json(["Tony","Lisa","Michael","Ginger","Food"]);
   });

app.listen(8000, () => {
 console.log("Server running on port== 8000");
});