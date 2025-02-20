import express from 'express'
import cron from 'node-cron'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import expenseEmail from './emailService/emailService.js';

const app= express();

dotenv.config();

const schedule =()=>{

}

app.listen(process.env.PORT,async()=>{
    console.log("Server is running on Port ",process.env.PORT)
    try {
        const dbResponse = await mongoose.connect(process.env.DB_CONNECT_URL)
        // console.log(dbResponse)
        console.log(`DB Connected Successfully ${dbResponse.connection.host}`)
    } catch (error) {
        console.log('Error in connecting DB',error)
    } 
})

const emailSednig=()=>{
    cron.schedule("* * * * * *",()=>{
        expenseEmail();
    })
}

// emailSednig();     //this is for sending the email, but this sends email continously per second so i comments this

