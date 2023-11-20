import express from 'express'
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.js'
import adminRouter from './routes/admin.js'
import companyRouter from  './routes/company.js'
import { config } from 'dotenv';
import cors from 'cors'

const app = express();

app.use(express.json())
app.use(cookieParser());
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}))

config({
    path:'./data/config.env'
})

mongoose.connect(process.env.MONGO_URL,{
    dbName:"Company_Rating"
}).then(()=>console.log("MongoDB is Connected!"))

// adminRouter
app.use('/api/admin',adminRouter)

// userRouter
app.use('/api/users',userRouter)

// blogRouter
app.use('/api/company',companyRouter)

// MVC = MODEL VIEWS CONTROLLS



app.listen(process.env.PORT,()=>console.log(`Server is running on Port ${process.env.PORT}`))