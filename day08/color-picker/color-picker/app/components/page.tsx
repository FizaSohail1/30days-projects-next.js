'use client'
import React, { useState,ChangeEvent } from 'react'

function ColorPicker() {

    const [color,setColor] = useState<string>('#00000');

    const handleColorChange = (e:ChangeEvent<HTMLInputElement>) =>{
     setColor(e.target.value)
    }

    const copyToClipboard = ():void =>{
        navigator.clipboard.writeText(color);
        alert("Copy to Clipboard")
    }

  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
    <div className="w-full max-w-md mx-auto p-8 grid gap-8">
      <div className="text-center space-y-2 text-white">
        <div>Color Picker</div>
        <div>
          Select a color and copy the hex and RGB values.
        </div>
      </div>
      <div className="grid gap-4">
        <div
          className="w-full h-48 rounded-lg border-4 border-gray-200 dark:border-gray-800"
          style={{ backgroundColor: color }}
        />
        <div className="grid gap-2 text-center">
          <div className="text-2xl font-semibold text-white">{color}</div>
          <div className="text-gray-500 dark:text-gray-400">
            RGB: {parseInt(color.slice(1, 3), 16)},{" "}
            {parseInt(color.slice(3, 5), 16)},{" "}
            {parseInt(color.slice(5, 7), 16)}
          </div>
          <button onClick={copyToClipboard} className="w-full text-white">Copy to Clipboard</button>
        </div>
        <input
          type="color"
          value={color}
          onChange={handleColorChange}
          className="w-full h-16 p-0 border-0 rounded-md cursor-pointer"
        />
      </div>
    </div>
  </div>
    </div>
  )
}

export default ColorPicker
