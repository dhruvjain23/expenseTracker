import express from 'express'
import ExpenseSchemaModel from '../models/db.model.js'
import mongoose from 'mongoose';

const router=express.Router();

//Add expense
router.post('/',async(req,res)=>{
    const {label,amount,date} = req.body;
    try {
        const newExpense = new ExpenseSchemaModel({
            label:label,
            amount:amount,
            date:date
        })
        const exp_res = await newExpense.save();
        res.status(201).json(exp_res)
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Intenal Server Error"});
    }
})

//Get all expense
router.get('/',async(req,res)=>{
    try {
        const Allexpenses =await ExpenseSchemaModel.find().sort({createdAt:-1});
        res.status(200).json(Allexpenses);
    } catch (error) {
        res.status(500).json({error:"Internal Server Error"})
        console.log(error)
    }
})

// Update expense
router.put('/:id',async(req,res)=>{
    const {label,amount,date} = req.body;
    try {
        const updatedExpense = await ExpenseSchemaModel.findByIdAndUpdate(req.params.id,{
            $set:{
                label:label,
                amount:amount,
                date:date
            }
        },
        {new:true})

        res.status(200).json(updatedExpense);
    } catch (error) {
        res.status(500).json({error:"Internal Server Error"})
        console.log("Error in Update function",error)
    }
})

//Delete expense
router.delete('/:id',async(req,res)=>{
    try {
        const deletedResponse = await ExpenseSchemaModel.findByIdAndDelete(req.params.id);
        res.status(201).json({deletedResponse})
    } catch (error) {
        console.log("Error in Delete expense function",error)
        res.status(500).json({message:"Internal Server Error"})
    }
})


export default router;