import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import router from './routes/expense.route.js';

const app= express();

dotenv.config();

//Middleware
app.use(express.json());
app.use(cors())
app.use('/',router)


app.listen(process.env.PORT,async()=>{
    console.log(`Server is running on the port ${process.env.PORT}`)
    //DB Connection
    try {
        const conn = await mongoose.connect(process.env.DB_URL)
        console.log(`DB Connected Succesfully: ${conn.connection.host}`)
    } catch (error) {
        console.log("Error in DB Connection",error)
    }
})