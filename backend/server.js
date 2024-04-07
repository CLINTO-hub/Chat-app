import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import express from 'express'
import authRouters from '../backend/Routes/authRoute.js'
import messageRouters from '../backend/Routes/messageRoute.js'
import userRouters from '../backend/Routes/userRoute.js'
import connectDB from './db/connectDB.js'

const app = express()

dotenv.config()

const PORT = process.env.PORT || 5000;


app.use(express.json())
app.use(cookieParser())

app.get('/',(req,res)=>{
    res.send('Hello world')
})

app.use('/api/auth',authRouters);
app.use('/api/messages',messageRouters);
app.use('/api/users',userRouters);

app.listen(PORT,()=>{
connectDB();
console.log('Server started');


})
