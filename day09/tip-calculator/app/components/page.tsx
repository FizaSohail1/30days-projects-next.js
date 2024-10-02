'use client'
import React from 'react';
import { useState, ChangeEvent } from 'react';

function TipCalculator() {

    const [billAmount,setBillAmount]= useState<number |null>(null);
    const[tipPercentage,setTipPercentage] = useState<number | null>(null);
    const[tipAmount,setTipAmount] = useState<number>(0);
    const[totalAmount,setTotalAmount] = useState<number>(0);

    const handleBillAmountChange = (e:ChangeEvent<HTMLInputElement>):void =>{
        setBillAmount(parseFloat(e.target.value))
    }
    const handleTipPercentageChange = (e:ChangeEvent<HTMLInputElement>):void =>{
    setTipPercentage(parseFloat(e.target.value))
    }

    const calculate = () =>{
        if(billAmount !== null && tipPercentage !== null){
            const tip = billAmount * (tipPercentage / 100);
            setTipAmount(tip)
            setTotalAmount(billAmount + tip);
        }
    }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-300">
    <div className="w-full max-w-md p-6  dark:bg-gray-800 shadow-lg rounded-lg">
      <div>
        <div className='text-2xl text-center my-3 font-bold'>Tip Calculator</div>
        <div>
          Enter the bill amount and tip percentage to calculate the tip and total.
        </div>
      </div>
      <div className="space-y-4">
        <div className="grid gap-2 my-3">
          <label htmlFor="billAmount ">Bill Amount</label>
          <input
            id="bill-amount"
            type="number"
            placeholder="Enter bill amount"
            value={billAmount !== null ? billAmount : ""} 
            onChange={handleBillAmountChange}
            className='p-2 rounded-xl text-black'/>
            
        </div>
        <div className="grid gap-2">
          <label htmlFor="tip-percentage ">Tip Percentage</label>
          <input
            id="tip-percentage"
            type="number"
            placeholder="Enter tip percentage"
            value={tipPercentage !== null ? tipPercentage : ""}
            onChange={handleTipPercentageChange}
            className='p-2 rounded-xl text-black'/>
        </div>
        <button onClick={calculate} className='bg-yellow-500 hover:bg-yellow-400 text-gray-800 font-bold p-2 rounded-xl text-center w-full'>Calculate</button>
      </div>
      <div className="grid gap-2 mt-5">
        <div className="flex items-center justify-between">
          <span>Tip Amount:</span>
          <span className="font-bold">${tipAmount.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Total Amount:</span>
          <span className="font-bold">${totalAmount.toFixed(2)}</span>
        </div>
      </div>
    </div>
  </div>
  )
}

export default TipCalculator
