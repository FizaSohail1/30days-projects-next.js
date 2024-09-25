'use client'
import React from 'react'
import {useState,useEffect, useMemo} from 'react'

function DigitalClock() {

    const [time,setTime] = useState<Date>(new Date())
    const [is24Hour, setIs24Hour] = useState<boolean>(true);
    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => {
        setMounted(true); 
        const interval = setInterval(() => {
          setTime(new Date()); 
        }, 1000);
        return () => clearInterval(interval);
      }, []);

      const formattedTime = useMemo<string>(() => {
        if (!mounted) return "";
        const hours = is24Hour
          ? time.getHours().toString().padStart(2, "0") 
          : (time.getHours() % 12 || 12).toString().padStart(2, "0"); 
        const minutes = time.getMinutes().toString().padStart(2, "0"); 
        const seconds = time.getSeconds().toString().padStart(2, "0");
        return `${hours}:${minutes}:${seconds}`; 
      }, [time, is24Hour, mounted]); 
  return (
    <div className="flex items-center justify-center h-screen">
    <div className="p-8 shadow-lg shadow-slate-500 rounded-2xl bg-slate-300 border-b-indigo-700 border-y-4">
      <div className="flex flex-col items-center justify-center ">
        <div className="text-2xl font-bold text-black">Digital Clock</div>
        <div className="text-sm text-gray-900 dark:text-gray-800 mb-4">
          Display current time in hours, minutes, and seconds.
        </div>
        <div className="text-6xl font-bold tracking-tight text-black">
          {formattedTime}
        </div>
        <div className="mt-4  flex items-center border-2 border-indigo-800 text-black">
          <button onClick={() => setIs24Hour(true)} className=" font-bold  p-2 bg-indigo-600 ">24-Hour Format</button>
          <button onClick={() => setIs24Hour(false)} className=" font-bold  ml-3 p-2">12-Hour Format </button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default DigitalClock
