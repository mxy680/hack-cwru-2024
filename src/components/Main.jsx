import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Main = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);

    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('');
    const [race, setRace] = useState('');
    const [hair, setHair] = useState('');
    const [facialHair, setFacialHair] = useState('');
    const [faceShape, setFaceShape] = useState('');
    const [customField, setCustomField] = useState('');

    const [image, setImage] = useState('/images/icon.png');

    const generateImage = async (event) => {
        if (event) {
            event.preventDefault();
        }

        setIsProcessing(true);

        // Creating prompt
        let prompt = `photo of mugshot, only shoulders and above`
        if (age) prompt += `, age: ${age}`;
        if (gender) prompt += `, gender: ${gender}`;
        if (race) prompt += `, race: ${race}`;
        if (weight) prompt += `, weight: ${weight}`;
        if (height) prompt += `, height: ${height}`;
        if (hair) prompt += `, hair: ${hair}`;
        if (facialHair) prompt += `, facial hair: ${facialHair}`;
        if (faceShape) prompt += `, face shape: ${faceShape}`;
        if (customField) prompt += `, ${customField}`;

        console.log('Prompt: ', prompt)

        const response = await fetch(process.env.REACT_APP_IMAGE_GENERATOR_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
            },
            body: JSON.stringify({ prompt: prompt, negative_prompt: 'disfigured, ugly, bad, immature, cartoon, anime, 3d, painting, text, black text bar' }),
        });

        const data = await response.json();
        setImage(data[0]);
        console.log('image set')

        setIsProcessing(false);
    }

    useEffect(() => {
        if (location.state) {
            setWeight(location.state.weight || '');
            setHeight(location.state.height || '');
            setGender(location.state.gender || '');
            setAge(location.state.age || '');
            setRace(location.state.race || '');
            setHair(location.state.hair || '');
            setFacialHair(location.state.facialHair || '');
            setFaceShape(location.state.faceShape || '');
            setCustomField(location.state.other || '');
        }

        //generateImage();
    }, [location.state]);

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-900">
            <div className="flex w-full m-8 mt-4">
                <div className="w-1/2 bg-gray-800 p-8 rounded-lg mr-4 overflow-y-auto max-h-full shadow-xl">
                    <form className="space-y-6">
                        <h1 className="text-3xl font-bold text-white mb-4">Face Attributes Generator</h1> {/* Title */}
                        <h2 className="text-lg text-gray-300 mb-8">Please fill in at least one of the following details:</h2> {/* Subtitle */}
                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <InputField label="Age" value={age} onChange={setAge} />
                                <InputField label="Race" value={race} onChange={setRace} />
                                <InputField label="Height" value={height} onChange={setHeight} />
                                <InputField label="Weight" value={weight} onChange={setWeight} />
                            </div>
                            <div>
                                <InputField label="Gender" value={gender} onChange={setGender} />
                                <InputField label="Hair" value={hair} onChange={setHair} />
                                <InputField label="Facial Hair" value={facialHair} onChange={setFacialHair} />
                                <InputField label="Face Shape" value={faceShape} onChange={setFaceShape} />
                            </div>
                        </div>
                        <label className="block text-lg text-gray-300">
                            <CustomInputField label="Custom Field" value={customField} onChange={setCustomField} />
                        </label>
                        <button type="submit" onClick={generateImage} className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline block mx-auto transition duration-300 ease-in-out">
                            {!isProcessing ? 'Generate Image' : 'Generating...'}
                        </button>
                        <div className="mt-8 text-center">
                            <button
                                className="text-sm text-blue-700 underline focus:outline-none transition duration-300 ease-in-out"
                                onClick={() => {
                                    // Navigate to home route
                                    navigate('/');
                                }}
                            >
                                Return Home
                            </button>
                        </div>
                    </form>
                </div>
                <div className="w-1/2 bg-gray-800 p-8 rounded-lg opacity-90 shadow-lg flex justify-center items-center">
                    <img src={image} alt="Selected" className="max-w-full h-auto rounded-lg" />
                </div>

            </div>
        </div>
    );
};

const InputField = ({ label, value, onChange }) => (
    <div className='mb-4'>
        <label className="block text-lg text-gray-300 mb-1">{label}:</label>
        <div className="relative">
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="appearance-none w-full px-4 py-2 border-2 border-gray-500 rounded-lg bg-gray-800 text-gray-300 focus:outline-none focus:border-purple-500 transition duration-300 ease-in-out"
            />
        </div>
    </div>
);

const CustomInputField = ({ label, value, onChange }) => (
    <div>
        <label className="block text-lg text-gray-300 mb-1">{label}:</label>
        <div className="relative">
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="appearance-none w-full px-4 py-2 border-2 border-gray-500 rounded-lg bg-gray-800 text-gray-300 focus:outline-none focus:border-purple-500 transition duration-300 ease-in-out"
            />
        </div>
    </div>
);

export default Main;
