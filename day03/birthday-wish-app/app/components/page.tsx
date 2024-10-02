'use client';
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBirthdayCake, FaGift } from 'react-icons/fa';
import { GiBalloons } from 'react-icons/gi';

type ConfettiProps = {
  width: number;
  height: number;
};

const DynamicConfetti = dynamic(() => import('react-confetti'), { ssr: false });

const candleColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'];
const balloonColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'];
const confettiColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE'];

const BirthdayWishApp: React.FC = () => {
  const [candles, setCandles] = useState<number>(0);
  const [balloonsPop, setBalloonsPop] = useState<number>(0);
  const [windowSize, setWindowSize] = useState<ConfettiProps>({ width: 0, height: 0 });
  const [confetti, setConfetti] = useState<boolean>(false);
  const [celebrating, setCelebrating] = useState<boolean>(false);

  const totalCandles: number = 5;
  const totalBalloons: number = 5;

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (candles === totalCandles && balloonsPop === totalBalloons) {
      setConfetti(true);
    }
  }, [candles, balloonsPop]);

  const lightCandle = (index: number) => {
    if (index === candles) {
      setCandles((prev) => prev + 1);
    }
  };

  const popBalloon = (index: number) => {
    if (index === balloonsPop) {
      setBalloonsPop((prev) => prev + 1);
    }
  };

  const celebrate = () => {
    setCelebrating(true);
    setConfetti(true);
    const interval = setInterval(() => {
      setCandles((prev) => {
        if (prev < totalCandles) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 500);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl border-2 border-black p-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-black">Happy 20th Birthday!</div>
            <div className="text-2xl font-semibold text-gray-600">Fiza Sohail</div>
            <p className="text-lg text-gray-500">September 4th</p>
          </div>
          <div className="space-y-6 text-center mt-6">
            <div>
              <h3 className="text-lg font-semibold text-black mb-2">Light the candles:</h3>
              <div className="flex justify-center space-x-2">
                {[...Array(totalCandles)].map((_, index) => (
                  <AnimatePresence key={index}>
                    {(celebrating && index <= candles) || (!celebrating && index < candles) ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{ duration: 0.5, delay: celebrating ? index * 0.5 : 0 }}
                      >
                        <FaBirthdayCake
                          className="w-8 h-8 transition-colors duration-300 ease-in-out cursor-pointer hover:scale-110"
                          style={{ color: candleColors[index % candleColors.length] }}
                          onClick={() => lightCandle(index)}
                        />
                      </motion.div>
                    ) : (
                      <FaBirthdayCake
                        className="w-8 h-8 text-gray-300 transition-colors duration-300 ease-in-out cursor-pointer hover:scale-110"
                        onClick={() => lightCandle(index)}
                      />
                    )}
                  </AnimatePresence>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-black mb-2">Pop the balloons:</h3>
              <div className="flex justify-center space-x-2">
                {[...Array(totalBalloons)].map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 1 }}
                    animate={{ scale: index < balloonsPop ? 0 : 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <GiBalloons
                      className="w-8 h-8 cursor-pointer hover:scale-110"
                      style={{ color: index < balloonsPop ? '#D1D5DB' : balloonColors[index % balloonColors.length] }}
                      onClick={() => popBalloon(index)}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-6">
            <button
              className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-all duration-300 flex items-center"
              onClick={celebrate}
              disabled={celebrating}
            >
              Celebrate! <FaGift className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </motion.div>
      {confetti && (
        <DynamicConfetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={500}
          colors={confettiColors}
        />
      )}
    </div>
  );
};

export default BirthdayWishApp;
