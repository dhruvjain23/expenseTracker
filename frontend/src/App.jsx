import React, { useEffect, useState } from 'react'
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { MdOutlineCancel } from "react-icons/md";
import { PieChart } from '@mui/x-charts/PieChart';

import {connectionBackend} from './requestMethods.js'

const App = () => {

  const [showAddExpense, setShowAddExpense] = useState(false)
  const [showReport, setShowReport] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [label, setLabel] = useState('')
  const [expenses,setExpenses] =useState([])
  const [amount, setAmount] = useState(0)
  const [date, setDate] = useState('')
  const [updatedId, setUpdatedId] = useState('')
  const [updatedLabel, setUpdatedLabel] = useState('')
  const [updatedAmount, setUpdatedAmount] = useState('')
  const [updatedDate, setUpdatedDate] = useState('')
 
  const [searchTerm, setSearchTerm] = useState("");


  const handleAddExpense = () => {
    setShowAddExpense(!showAddExpense)
  }

  const handleReport = () => {
    setShowReport(!showReport)
  }

  const handleEdit = (id) => {
    setShowEdit(!showEdit)
    setUpdatedId(id)
  }

  const addExpenseToDb= async()=>{
      try {
        await connectionBackend.post('/',{
          
          label:label,
          amount:amount,
          date:date

        })
        window.location.reload();
      } catch (error) {
        console.error("Error in Adding Expense to the db",error)
      }
  }
  useEffect(()=>{
    const getExpenses = async()=>{
      try {
        const res= await connectionBackend.get('/');
        setExpenses(res.data);
        console.log(res.data)
      } catch (error) {
        console.log("Error in getting all expenses from the server",error)
      }
    }
    getExpenses()
  },[])

  const handelDelete=async(id)=>{
    try {
      await connectionBackend.delete(`/${id}`)
      window.location.reload();
    } catch (error) {
      console.log("Error in deleting the expense by clicking the delete button",error);
    }
  }

  // const handleUpdateExpense =async()=>{
  //     if(updatedId){
  //       try {
  //         await connectionBackend.put(`/${updatedId}`,{
  //           // label: updatedLabel===null?label:updatedLabel,
  //           // amount:updatedAmount===null?amount:updatedAmount,
  //           // date:updatedDate===null?date:updatedDate
  //           label:updatedLabel,
  //           amount:updatedAmount,
  //           date:updatedDate
  //         })
  //         window.location.reload();
  //       } catch (error) {
  //         console.log("Error in updating function frontend",error)
  //       }
  //     }
  // }

  const handleUpdateExpense = async () => {
    if (updatedId) {
      try {
        await connectionBackend.put(`/${updatedId}`, {
          label: updatedLabel?.trim() ? updatedLabel : label,
          amount: updatedAmount !== "" && updatedAmount !== null ? updatedAmount : amount,
          date: updatedDate ? updatedDate : date
        });
        window.location.reload();
      } catch (error) {
        console.log("Error in updating function frontend", error);
      }
    }
  };
  

  
  return (
    <div>
      <div className='flex flex-col justify-center items-center mt-[3%] w-[80%] mr-[5%] ml-[5%] '>
        <h1 className='text-2xl font-medium text-[#555]'>Expense Tracker</h1>

        <div className='relative flex items-center justify-between mt-5 w-[100%]'>
          <div className='relative flex justify-between w-[300px]'>

            <button className='bg-amber-900 p-[10px] border-none outline-none cursor-pointer text-[#fff] text-medium' onClick={handleAddExpense}>Add Expense</button>

            <button className='bg-blue-900 p-[10px] border-none outline-none cursor-pointer text-[#fff] text-medium' onClick={handleReport}>Expense Report</button>

          </div>
        

          {showAddExpense &&
            (<div className='absolute z-[999] flex flex-col p-[10px] top-[40px] left-0 h-[500px] w-[500px]  bg-white shadow-xl'>
              <MdOutlineCancel className='flex justify-end items-end text-red-700 text-2xl cursor-pointer' onClick={handleAddExpense} />

              <label htmlFor="" className='mt-[10px] font-semibold text-[18px]'>Expense Name</label>
              <input type="text" name="" id="" className='outline-none border-[#555] border-solid border-2 p-[10px] ' placeholder='Expense Name' onChange={(e)=>setLabel(e.target.value)}/>

              <label htmlFor="" className='mt-[10px] font-semibold text-[18px]'> Amount</label>
              <input type="number" name="" id="" className='outline-none border-[#555] border-solid border-2 p-[10px] ' placeholder='₹ Expense Amount 'onChange={(e)=>setAmount(e.target.value)} />

              <label htmlFor="" className='mt-[10px] font-semibold text-[18px]'>Date</label>
              <input type="date" name="" id="" className='outline-none border-[#555] border-solid border-2 p-[10px] ' placeholder='Expense Date' onChange={(e)=>setDate(e.target.value)}/>

              <button className='bg-amber-950 text-white p-[10px] border-none cursor-pointer my-[10px]' onClick={addExpenseToDb}>Add Expense</button>
            </div>)
          }

          {showReport && (
            <div className='absolute z-[999] flex flex-col p-[10px] top-[40px] left-[170px] h-[500px] w-[500px]       bg-white shadow-xl'>
              <MdOutlineCancel className='flex justify-end items-end text-red-700 text-2xl cursor-pointer' onClick={handleReport} />

              <PieChart
                series={[
                  {
                    data:  expenses.map(expense=>({
                      label:expense.label,
                      value:expense.amount
                    })),
                    innerRadius: 30,
                    outerRadius: 100,
                    paddingAngle: 5,
                    cornerRadius: 5,
                    startAngle: -45,
                    endAngle: 225,
                    cx: 150,
                    cy: 150,
                  }
                ]}
              />
            </div>
          )}

          <div>
            {/* <input type="text" name="" id="" className='p-[10px] w-[150px] border-2  border-[#444] border-soild' placeholder='Search' /> */}
            <input
              type="text"
              placeholder="Search"
              className="p-[10px] w-[150px] border-2 border-[#444] border-solid"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>


        </div>

        <div className='flex flex-col'>
          {expenses.map((item,index)=>
            <div className='relative flex justify-between items-center w-[80vw] h-[100px] bg-[#f3edeb] my-[20px] py-[10px]' key={index}>
              <h2 className='m-[20px] text-[#555] text-[18px] font-medium'>{item.label}</h2>
              <span className='m-[20px] text-[18px]'>{item.date}</span>
              <span className='m-[20px] text-[18px] font-medium'>{item.amount}</span>

              <div className='m-[20px] cursor-pointer'>
                <FaTrash className='text-red-600 mb-[10px]' onClick={()=>{
                  handelDelete(item._id)
                }}/>
                <FaEdit className='text-[#444] ' onClick={() => {handleEdit(item._id) }} />
              </div>
            </div>

          )}

          

        </div>

        {showEdit && (
          <div className='absolute z-[999] flex flex-col p-[10px] top-[28%] left-[50%] h-[500px] w-[500px] bg-white shadow-xl'>
            <MdOutlineCancel className='flex justify-end items-end text-red-700 text-2xl cursor-pointer' onClick={handleEdit} />

            <label htmlFor="" className='mt-[10px] font-semibold text-[18px]'>Expense Name</label>
            <input type="text" name="" id="" className='outline-none border-[#555] border-solid border-2 p-[10px] ' placeholder='Expense Name' onChange={(e)=>setUpdatedLabel(e.target.value)}/>

            <label htmlFor="" className='mt-[10px] font-semibold text-[18px]'> Amount</label>
            <input type="number" name="" id="" className='outline-none border-[#555] border-solid border-2 p-[10px] ' placeholder='₹ Expense Amount 'onChange={(e)=>setUpdatedAmount(e.target.value)} />

            <label htmlFor="" className='mt-[10px] font-semibold text-[18px]'>Date</label>
            <input type="date" name="" id="" className='outline-none border-[#555] border-solid border-2 p-[10px] ' placeholder='Expense Date' onChange={(e)=>setUpdatedDate(e.target.value)} />

            <button className='bg-amber-950 text-white p-[10px] border-none cursor-pointer my-[10px]' onClick={handleUpdateExpense}>Update Expense</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
