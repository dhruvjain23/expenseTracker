import mongoose from 'mongoose'

const expenseSchema = mongoose.Schema({
    label:{
        type:String,
        require:true
    },
    amount:{
        type:Number,
        require:true
    },
    date:{
        type:String,
        require:true
    }
})

const ExpenseSchemaModel = mongoose.model("ExpenseSchemaModel",expenseSchema);

export default ExpenseSchemaModel;