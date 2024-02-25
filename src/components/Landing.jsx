import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import OpenAI from "openai";
import './Landing.css';

const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
});

const Landing = () => {
    const [description, setDescription] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const navigate = useNavigate();

    const handleSend = async () => {
        setIsProcessing(true); // Set isProcessing to true when the send button is clicked
        // Simulate an API call or any asynchronous operation
            setIsProcessing(false); // Set isProcessing back to false after the operation is complete

            // Open-AI Integration
            const input = description;
            setDescription('');

            const response = await openai.chat.completions.create({
                model: "gpt-3.5-turbo-16k",
                messages: [
                    {
                        "role": "system",
                        "content": "You will be given a prompt in sentence form describing an individual. Your task is to extract the following features by inferring the prompt: weight, height, gender, age, race, hair, facial hair, face shape. You must return your response in json format. If you cannot extract one of those features, set that feature as null. Otherwise, set the feature as a string in similar format to which you received it. Also, there may be extra information in the prompt, like jewelery, scars, etc., which you need to store as a string in the “other” field in the json. \nexample \n{\n\"weights\" : 100,\n\"face_hair\": \"black, long\"\n}"
                    },
                    {
                        "role": "user",
                        "content": input 
                    },
                ],
                temperature: 1,
                max_tokens: 256,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0,
            });

            const data = JSON.parse(response.choices[0].message.content);

            // Redirect to the analysis page
            navigate('/analysis', { state: data });
    };

    const handleSkip = () => {
        setDescription('');
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-700 via-gray-900 to-black">
            <div className="shadow-2xl rounded-xl overflow-hidden transform transition-all hover:scale-105 duration-500">
                <div className="text-center p-12 bg-opacity-90 backdrop-filter backdrop-blur-lg bg-gray-800 rounded-lg border border-gray-600 max-w-2xl w-full">
                    <h1 className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 mb-6">Visualent</h1>
                    <p className="mb-8 text-lg text-gray-300">
                        Generate highly accurate mugshots from verbal or written descriptions. Our goal is to revolutionize the way we identify and locate criminals, and to support police investigations and enhance public safety. Visualent is your AI-powered ally in creating a safer community. Try it out by describing a person below!
                    </p>
                    <div className="mb-4">
                        <textarea
                            placeholder="Describe the person here"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full p-4 bg-gray-700 bg-opacity-80 rounded text-gray-300 placeholder-gray-500 focus:outline-none focus:ring focus:ring-purple-500 resize-none h-48"
                        ></textarea>
                    </div>
                    <div className="flex flex-col md:flex-row gap-2">
                        <button onClick={handleSend} className="p-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded transition duration-200 flex-grow">
                            <FontAwesomeIcon icon={faPaperPlane} className="w-5 h-5 mr-2" />
                            {isProcessing ? 'Processing...' : 'Send'} {/* Update the button text based on isProcessing */}
                        </button>
                        <button onClick={handleSkip} className="p-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded transition duration-200 flex-grow">
                            <FontAwesomeIcon icon={faArrowRight} className="w-5 h-5 mr-2" />
                            Skip
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Landing;