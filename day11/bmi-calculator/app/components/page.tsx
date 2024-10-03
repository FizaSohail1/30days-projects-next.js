'use client'
import React,{useState,ChangeEvent} from 'react'

interface BmiResult {
    bmi: string;
    category: string;
}

function BMICalculator() {
  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [result, setResult] = useState<BmiResult | null>(null);
  const [error, setError] = useState<string>("");

  const handleHeightChange = (e:ChangeEvent<HTMLInputElement>) =>{
    setHeight(e.target.value)
  }

  const handleWeightChange = (e:ChangeEvent<HTMLInputElement>) => {
    setWeight(e.target.value)
  }

  const calculateBmi = (): void => {
    if (!height || !weight) {
      setError("Please enter both height and weight.");
      return;
    }
  
    const heightInMeters = parseFloat(height) / 100;
    if (heightInMeters <= 0) {
      setError("Height must be a positive number.");
      return;
    }
    const weightInKg = parseFloat(weight);
    if (weightInKg <= 0) {
      setError("Weight must be a positive number.");
      return;
    }

    const bmiValue = weightInKg / (heightInMeters * heightInMeters);
    let category = "";
    if (bmiValue < 18.5) {
      category = "Underweight";
    } else if (bmiValue >= 18.5 && bmiValue < 25) {
      category = "Normal";
    } else if (bmiValue >= 25 && bmiValue < 30) {
      category = "Overweight";
    } else {
      category = "Obese";
    }
    setResult({ bmi: bmiValue.toFixed(1), category });
    setError("");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 p-4">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-4 text-gray-800">BMI Calculator</h1>
        <p className="text-center text-gray-600 mb-8">Enter your height and weight to calculate your BMI</p>
        
        <div className="space-y-6">
          <div>
            <label htmlFor="height" className="block text-gray-700 font-semibold">Height (cm)</label>
            <input
              id="height"
              type="number"
              placeholder="Enter your height"
              value={height}
              onChange={handleHeightChange}
              className="w-full p-2 border border-gray-300 rounded-md "
            />
          </div>
          
          <div>
            <label htmlFor="weight" className="block text-gray-700 font-semibold">Weight (kg)</label>
            <input
              id="weight"
              type="number"
              placeholder="Enter your weight"
              value={weight}
              onChange={handleWeightChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <button onClick={calculateBmi} className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors">Calculate </button>
          {error && <div className="text-red-500 text-center mt-4">{error}</div>}

          {result && (
            <div className="mt-8">
              <div className="text-center text-4xl font-bold text-gray-800">{result.bmi}</div>
              <div className="text-center text-lg text-gray-600 mt-2">{result.category}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BMICalculator;
