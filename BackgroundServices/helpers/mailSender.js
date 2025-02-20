import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

function createTransportRoute(config){
    const transporter = nodemailer.createTransport(config)
    return transporter;
}

let configuration={
    service:'gmail',
    host:'smtp.gmail.com',
    port:587,
    requireTLS:true,
    auth:{
        user:process.env.EMAIL,
        pass:process.env.PASSWORD
    }
}

const sendMail =async(messageOption)=>{
    const transporter= await createTransportRoute(configuration)
    await transporter.verify();
    await transporter.sendMail(messageOption,(error,info)=>{
        if(error){
            console.log(error)
        }
        console.log(info.response);
    })
}

export default sendMail;