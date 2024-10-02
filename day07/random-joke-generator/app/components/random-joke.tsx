'use client';
import React from 'react';
import { useState , useEffect } from 'react';

function RandomJokeGenerator() {
 
    interface JokeResponse{
        setup:string,
        punchline:string
    }

    const [joke,setJoke] = useState<string>("");

    async function fetchJoke(): Promise<void> {
        try {
          const response = await fetch("https://official-joke-api.appspot.com/random_joke");
          const data: JokeResponse = await response.json();
          setJoke(`${data.setup} - ${data.punchline}`);
        } 
        catch (error) {
          console.error("Error fetching joke:", error);
          setJoke("Failed to fetch joke. Please try again.");
        }
      }

    useEffect(()=>{
        fetchJoke()
    },[])

  return (
   <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-[#ff00ea] to-[#ff6b6b] p-4">
  <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
    <h1 className="text-4xl font-extrabold mb-6 text-[#333333] text-center">😂 Random Joke 😂</h1>
    <div className="bg-[#f0f0f0] rounded-lg p-6 mb-6 text-[#444444] text-xl shadow-md text-center">
      {joke || "Loading..."}
    </div>
    <button 
      onClick={fetchJoke} 
      className="bg-[#28a745] hover:bg-[#218838] text-white font-semibold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
    >
      😂 Get New Joke 😂
    </button>
  </div>
</div>

  )
}

export default RandomJokeGenerator