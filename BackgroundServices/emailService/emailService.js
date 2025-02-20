import dotenv from 'dotenv'
import sendMail from '../helpers/mailSender.js'
import ExpenseModel from '../models/expense.module.js'

dotenv.config()

const expenseEmail= async()=>{
    const expenses = await ExpenseModel.find({});
    const totalExpense= expenses.reduce(
        (acc,expense)=> acc+expense.amount,0
    )

    if(totalExpense>10000){
        let messageOption={
            from:process.env.EMAIL,
            to:process.env.ADMIN_EMAIL,
            subject:"Warning",
            text:`Your total expense is ${totalExpense}. Please review your expenses`
        }
        await sendMail(messageOption)
    }
}

export default expenseEmail