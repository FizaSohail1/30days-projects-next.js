'use client';
import { useEffect,useState,ChangeEvent } from "react";

interface NumberGuessGame{
    gameStarted:boolean,
    gameOver:boolean,
    paused:boolean,
    attemps:number,
    targetNumber:number,
    userGuess:number|string    
}



function NumberGuessingGame(): JSX.Element {

    const[gameStarted,setGameStarted]=useState<boolean>(false);
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [paused, setPaused] = useState<boolean>(false);
    const [targetNumber, setTargetNumber] = useState<number>(0);
    const [userGuess, setUserGuess] = useState<number | string>("");
    const [attempts, setAttempts] = useState<number>(0);

    useEffect(()=>{
        if(gameStarted && !paused){
            const randomNumber = Math.floor(Math.random()*10 + 1)
            setTargetNumber(randomNumber)
        }
    },[gameStarted,paused]);

    const handleStartGame = ():void =>{
     setGameStarted(true);
     setGameOver(false);
     setPaused(false);
     setAttempts(0)
    }

    const handlePaused = () =>{
        setPaused(true)
    }

    const handleResumeGame = (): void => {
        setPaused(false); 
    };

    const handleGuess = () =>{
        if(typeof userGuess === 'number' && userGuess === targetNumber){
            setGameOver(true)
        }
        else{
            setAttempts(attempts + 1)
        }
    }

    const handleTryAgain = (): void => {
        setGameStarted(false);
        setGameOver(false);
        setUserGuess("");
        setAttempts(0);
      };

      const handleUserGuessChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setUserGuess(parseInt(e.target.value));
      };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-800 to-black">
    <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
      <h1 className="text-3xl font-bold text-center mb-2 text-black">
        Number Guessing Game
      </h1>
      <p className="text-center text-black mb-4">
        Try to guess the number between 1 and 10!
      </p>
      {!gameStarted && (
        <div className="flex justify-center mb-4">
          <button
            onClick={handleStartGame}
            className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Start Game
          </button>
        </div>
      )}
      {gameStarted && !gameOver && (
        <div>
          <div className="flex justify-center mb-4">
            {paused ? (
              <button
                onClick={handleResumeGame}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
              >
                Resume
              </button>
            ) : (
              <button
                onClick={handlePaused}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
              >
                Pause
              </button>
            )}
          </div>
          <div className="flex justify-center mb-4">
            <input
              type="number"
              value={userGuess}
              onChange={handleUserGuessChange}
              className="bg-gray-100 border border-gray-300 rounded-lg py-2 px-4 w-full max-w-xs"
              placeholder="Enter your guess"
            />
            <button
              onClick={handleGuess}
              className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded ml-4"
            >
              Guess
            </button>
          </div>
          <div className="text-center text-black">
            <p>Attempts: {attempts}</p>
          </div>
        </div>
      )}
      {gameOver && (
        <div>
          <div className="text-center mb-4 text-black">
            <h2 className="text-2xl font-bold">Game Over!</h2>
            <p>You guessed the number in {attempts} attempts.</p>
          </div>
          <div className="flex justify-center">
            <button
              onClick={handleTryAgain}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            >
              Try Again
            </button>
          </div>
        </div>
      )}
    </div>
  </div>
  )
}

export default NumberGuessingGame;
