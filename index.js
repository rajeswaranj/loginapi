require('dotenv').config();
var express = require("express");
var cors=require('cors')
const helmet = require("helmet")
var cookieParser = require('cookie-parser')
const mongoose=require('mongoose') 
const authRouter = require('./routers/authRouter');
const referralRoutes = require('./routers/referalRouter')
const userRoutes =require('./routers/userRouter')
const jobRoutes =require('./routers/jobRouter')

var app = express();


app.use(helmet())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("mongoDB connected")
}).catch(err=>{
    console.log("DB CONNECTION ERROR:::",err)
})

app.use(cors({
    origin:"http://localhost:5173"
}))

app.use('/api/auth',authRouter)
app.use('/api/referrals', referralRoutes);
app.use('/api/users', userRoutes);
app.use('/api/job', jobRoutes);
 

app.listen(8000, () => {
 console.log("Server running on port== 8000");
});