'use client'
import React,{useState,ChangeEvent} from 'react';
import {Card,CardHeader,CardTitle,CardDescription,CardContent,CardFooter} from "@/components/ui/card";
  import { Label } from "@/components/ui/label";
  import { Input } from "@/components/ui/input";
  import { Checkbox} from "@/components/ui/checkbox";
  import { Button } from "@/components/ui/button"
import { CheckedState } from '@radix-ui/react-checkbox';

function PasswordGenerator() {

    const[passwordLength,setPasswordLength] = useState<number>(16);
    const[includeUpperCase,setIncludeUpperCase] = useState<boolean>(true);
    const[includeLowerCase,setIncludeLowerCase] = useState<boolean>(true);
    const[includeNumber,setIncludeNumber] = useState<boolean>(true);
    const[includeSymbols,setIncludeSymbol] = useState<boolean>(true);
    const [password,setPassword] = useState<string>("");
    const [isChecked, setIsChecked] = useState(false);

    const handlePasswordLength = (e:ChangeEvent<HTMLInputElement>):void =>{
     setPasswordLength(Number(e.target.value))
    }

    const handleCheckboxChange = (setter: (value: boolean) => void) =>
  (checked: CheckedState): void => {
    if (typeof checked === "boolean") {
      setter(checked);
    }
  };

    const generatePassword = () => {
        const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
        const numberChars = "0123456789";
        const symbolChars = "!@#$%^&*()_+[]{}|;:,.<>?";

        let allChars = ""
        if(includeUpperCase) allChars +=uppercaseChars;
        if(includeLowerCase) allChars +=lowercaseChars;
        if(includeNumber) allChars += numberChars;
        if(includeSymbols) allChars += symbolChars;
        if (allChars === "") {
            alert("Please select at least one character type.");
            return;
        }
        let generatedPassword= "";
        for(let i=0; i< passwordLength; i++){
            let randomIndex = Math.floor(Math.random() * allChars.length);
            generatedPassword += allChars[randomIndex];
        }
        setPassword(generatedPassword);
    }

    const copyToClipBoard = () =>{
        navigator.clipboard.writeText(password).then(() => {
                alert("Password copied to clipboard!");
            },
              (err) => {
                alert("Failed to copy password to clipboard.");
            }
        )    
    };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4">
    <Card className="w-full max-w-md p-8 bg-white dark:bg-gray-800 shadow-2xl rounded-lg">
        <div className="space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Password Generator</h1>
                <p className="text-gray-600 dark:text-gray-400">Create a secure password with just a few clicks.</p>
            </div>
            <div className="space-y-4">
                <div>
                    <Label htmlFor="length" className="text-gray-700 dark:text-gray-300">Password Length</Label>
                    <Input
                        id="length"
                        type="number"
                        min="8"
                        max="32"
                        value={passwordLength}
                        onChange={handlePasswordLength}
                        className="w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-none rounded-md"
                    />
                </div>

                <div>
                    <Label className="text-gray-700 dark:text-gray-300">Include:</Label>
                    <div className="space-y-2">
                        <div className="flex items-center">
                            <Checkbox
                                id="uppercase"
                                checked={includeUpperCase}
                                onCheckedChange={handleCheckboxChange(setIncludeUpperCase)}
                            />
                            <Label htmlFor="uppercase" className="ml-2 text-gray-700 dark:text-gray-300">Uppercase Letters</Label>
                        </div>
                        <div className="flex items-center">
                            <Checkbox
                                id="lowercase"
                                checked={includeLowerCase}
                                onCheckedChange={handleCheckboxChange(setIncludeLowerCase)}
                            />
                            <Label htmlFor="lowercase" className="ml-2 text-gray-700 dark:text-gray-300">Lowercase Letters</Label>
                        </div>
                        <div className="flex items-center">
                            <Checkbox
                                id="numbers"
                                checked={includeNumber}
                                onCheckedChange={handleCheckboxChange(setIncludeNumber)}
                            />
                            <Label htmlFor="numbers" className="ml-2 text-gray-700 dark:text-gray-300">Numbers</Label>
                        </div>
                        <div className="flex items-center">
                            <Checkbox
                                id="symbols"
                                checked={includeSymbols}
                                onCheckedChange={handleCheckboxChange(setIncludeSymbol)}
                            />
                            <Label htmlFor="symbols" className="ml-2 text-gray-700 dark:text-gray-300">Symbols</Label>
                        </div>
                    </div>
                </div>
                <Button type="button" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md" onClick={generatePassword}>
                    Generate Password
                </Button>
                <div>
                    <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">Generated Password</Label>
                    <div className="flex items-center space-x-2">
                        <Input
                            id="password"
                            type="text"
                            value={password}
                            readOnly
                            className="flex-1 bg-gray-100 dark:bg-gray-700 text-black dark:text-gray-100 border-none rounded-md"
                        />
                        <Button type="button" className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md" onClick={copyToClipBoard}>
                            Copy
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </Card>
</div>
  
  )
}

export default PasswordGenerator
