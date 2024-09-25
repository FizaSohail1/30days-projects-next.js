'use client'
import React, { useState, ChangeEvent } from 'react';
import { FaPlus, FaMinus, FaTimes, FaDivide } from "react-icons/fa";

function Calculator() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState('');

  const handleNum1 = (e: ChangeEvent<HTMLInputElement>): void => {
    setNum1(e.target.value);
};

  const handleNum2 = (e: ChangeEvent<HTMLInputElement>): void => {
    setNum2(e.target.value);
};

  const add = () => setResult((parseFloat(num1) + parseFloat(num2)).toString());
  const subtract = () => setResult((parseFloat(num1) - parseFloat(num2)).toString());
  const multiply = () => setResult((parseFloat(num1) * parseFloat(num2)).toString());
  const divide = () => setResult(parseFloat(num2) !== 0 ? (parseFloat(num1) / parseFloat(num2)).toString() : 'Error: Division by zero');

  const clear = (): void => {
    setNum1('');
    setNum2('');
    setResult('');
  };

  return (
    <>
      <div className="flex flex-col items-center mt-20">
        <h1 className="text-3xl font-bold text-gray-100 mb-6">Simple Calculator</h1>

        <div className="bg-gray-900 h-auto w-[500px] mx-auto rounded-xl p-8 shadow-2xl space-y-6 border-4 border-gray-300">
          <div className="inputs flex items-center justify-between space-x-4">
            <div className="flex flex-col w-full">
              <label htmlFor="num1" className="text-gray-400 text-sm mb-1">Number 1</label>
              <input
                type="number"
                placeholder="Enter 1st number"
                className="bg-gray-800 text-white border border-gray-600 rounded-lg py-2 px-4 focus:outline-none focus:border-indigo-500 w-full"
                value={num1}
                onChange={handleNum1}
              />
            </div>

            <div className="flex flex-col w-full">
              <label htmlFor="num2" className="text-gray-400 text-sm mb-1">Number 2</label>
              <input
                type="number"
                placeholder="Enter 2nd number"
                className="bg-gray-800 text-white border border-gray-600 rounded-lg py-2 px-4 focus:outline-none focus:border-indigo-500 w-full"
                value={num2}
                onChange={handleNum2}
              />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 mt-4">
            <button className="bg-indigo-600  text-white py-3 px-4 rounded-lg hover:bg-indigo-500 transition-colors" onClick={add}>
              <FaPlus className="mx-auto" />
            </button>
            <button className="bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-500 transition-colors" onClick={subtract}>
              <FaMinus className="mx-auto" />
            </button>
            <button className="bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-500 transition-colors" onClick={multiply}>
              <FaTimes className="mx-auto" />
            </button>
            <button className="bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-500 transition-colors" onClick={divide}>
              <FaDivide className="mx-auto" />
            </button>
          </div>

          <div className="flex flex-col space-y-2 mt-4">
            <label htmlFor="result" className="text-gray-300">Result</label>
            <input 
              id="result"
              type="text"
              value={result}
              className="bg-gray-800 text-white border border-gray-600 rounded-lg py-2 px-4 focus:outline-none focus:border-indigo-500 w-full"
              placeholder="Result"
              readOnly
            />
          </div>

          <button className="w-full  border-green-600 border-2 text-white font-bold py-3 rounded-lg hover:bg-green-500 transition-colors" onClick={clear}>
            Clear
          </button>
        </div>
      </div>
    </>
  );
}

export default Calculator;
