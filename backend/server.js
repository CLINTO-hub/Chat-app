import path from "path"
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import authRouters from '../backend/Routes/authRoute.js'
import messageRouters from '../backend/Routes/messageRoute.js'
import userRouters from '../backend/Routes/userRoute.js'
import connectDB from './db/connectDB.js'
import { app, server } from './socket/Socket.js'


const __dirname = path.resolve();

dotenv.config()


const corsOptions = {
    origin: true,
};

const PORT = process.env.PORT || 5000;


app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOptions));

app.get('/',(req,res)=>{
    res.send('Sever is working')
})

app.use('/api/auth',authRouters);
app.use('/api/messages',messageRouters);
app.use('/api/users',userRouters);

app.use(express.static(path.join(__dirname,'/frontend/dist')))

app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,'frontend','dist','index.html'))
})

server.listen(PORT,()=>{
connectDB();
console.log('Server started');


})
