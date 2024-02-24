import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Main = () => {
    const location = useLocation();   

    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('');
    const [race, setRace] = useState('');
    const [hair, setHair] = useState('');
    const [facialHair, setFacialHair] = useState('');
    const [faceShape, setFaceShape] = useState('');
    const [wrinkles, setWrinkles] = useState('');
    const [freckles, setFreckles] = useState('');
    const [acne, setAcne] = useState('');
    const [build, setBuild] = useState('');

    const generate_image = async () => {

        // Creating prompt
        let prompt = `photo of mugshot`
        if (weight) prompt += `, weight: ${weight}`;
        if (height) prompt += `, height: ${height}`;
        if (gender) prompt += `, gender: ${gender}`;
        if (age) prompt += `, age: ${age}`;
        if (race) prompt += `, race: ${race}`;
        if (hair) prompt += `, hair: ${hair}`;
        if (facialHair) prompt += `, facial hair: ${facialHair}`;
        if (faceShape) prompt += `, face shape: ${faceShape}`;
        if (wrinkles) prompt += `, wrinkles: ${wrinkles}`;
        if (freckles) prompt += `, freckles: ${freckles}`;
        if (acne) prompt += `, acne: ${acne}`;
        if (build) prompt += `, build: ${build}`;

        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Token ${process.env.REACT_APP_IMAGE_GENERATOR_TOKEN}`);
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "version": "479633443fc6588e1e8ae764b79cdb3702d0c196e0cb2de6db39ce577383be77",
            "input": {
                "seed": 34694,
                "width": 1024,
                "height": 1024,
                "prompt": "photo of mugshot,  weight\\: 200,\\n    \\height\\: 116,\\n    \\gender\\: \\male\\,\\n    \\age\\: null,\\n    \\race\\: \\white\\,\\n    \\hair\\: \\black\\,\\n    \\facial_hair\\: null,\\n    \\face_shape\\: null,\\n    \\freckles\\: \\some\\,\\n    \\acne\\: null,\\n\\face_type\\: \\",
                "scheduler": "LCM",
                "num_outputs": 1,
                "guidance_scale": 2,
                "apply_watermark": true,
                "negative_prompt": "(worst quality, low quality, illustration, 3d, 2d, painting, cartoons, sketch), open mouth",
                "prompt_strength": 0.8,
                "num_inference_steps": 6
            }
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw
        };

        fetch(process.env.REACT_APP_IMAGE_GENERATOR_URL, requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.error(error));

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
            setWrinkles(location.state.wrinkles || '');
            setFreckles(location.state.freckles || '');
            setAcne(location.state.acne || '');
            setBuild(location.state.build || '');
        }

        generate_image();

    }, [location.state]);

    return (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-700 via-gray-900 to-black">
            <div className="flex w-full">
                <div className="w-1/2 bg-gray-800 p-8 rounded-lg mr-4 overflow-y-auto max-h-full">
                    <form className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-lg text-gray-300">
                                    <span>Weight:</span>
                                    <input type="text" value={weight} onChange={(e) => setWeight(e.target.value)} className="mt-1 block w-full rounded-md border-gray-700 bg-gray-600 text-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50 h-12 text-lg" />
                                </label>
                                <label className="block text-lg text-gray-300">
                                    <span>Height:</span>
                                    <input type="text" value={height} onChange={(e) => setHeight(e.target.value)} className="mt-1 block w-full rounded-md border-gray-700 bg-gray-600 text-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50 h-12 text-lg" />
                                </label>
                                <label className="block text-lg text-gray-300">
                                    <span>Gender:</span>
                                    <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} className="mt-1 block w-full rounded-md border-gray-700 bg-gray-600 text-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50 h-12 text-lg" />
                                </label>
                                <label className="block text-lg text-gray-300">
                                    <span>Age:</span>
                                    <input type="text" value={age} onChange={(e) => setAge(e.target.value)} className="mt-1 block w-full rounded-md border-gray-700 bg-gray-600 text-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50 h-12 text-lg" />
                                </label>
                                <label className="block text-lg text-gray-300">
                                    <span>Race:</span>
                                    <input type="text" value={race} onChange={(e) => setRace(e.target.value)} className="mt-1 block w-full rounded-md border-gray-700 bg-gray-600 text-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50 h-12 text-lg" />
                                </label>
                                <label className="block text-lg text-gray-300">
                                    <span>Hair:</span>
                                    <input type="text" value={hair} onChange={(e) => setHair(e.target.value)} className="mt-1 block w-full rounded-md border-gray-700 bg-gray-600 text-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50 h-12 text-lg" />
                                </label>
                            </div>
                            <div>
                                <label className="block text-lg text-gray-300">
                                    <span>Facial Hair:</span>
                                    <input type="text" value={facialHair} onChange={(e) => setFacialHair(e.target.value)} className="mt-1 block w-full rounded-md border-gray-700 bg-gray-600 text-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50 h-12 text-lg" />
                                </label>
                                <label className="block text-lg text-gray-300">
                                    <span>Face Shape:</span>
                                    <input type="text" value={faceShape} onChange={(e) => setFaceShape(e.target.value)} className="mt-1 block w-full rounded-md border-gray-700 bg-gray-600 text-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50 h-12 text-lg" />
                                </label>
                                <label className="block text-lg text-gray-300">
                                    <span>Wrinkles:</span>
                                    <input type="text" value={wrinkles} onChange={(e) => setWrinkles(e.target.value)} className="mt-1 block w-full rounded-md border-gray-700 bg-gray-600 text-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50 h-12 text-lg" />
                                </label>
                                <label className="block text-lg text-gray-300">
                                    <span>Freckles:</span>
                                    <input type="text" value={freckles} onChange={(e) => setFreckles(e.target.value)} className="mt-1 block w-full rounded-md border-gray-700 bg-gray-600 text-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50 h-12 text-lg" />
                                </label>
                                <label className="block text-lg text-gray-300">
                                    <span>Acne:</span>
                                    <input type="text" value={acne} onChange={(e) => setAcne(e.target.value)} className="mt-1 block w-full rounded-md border-gray-700 bg-gray-600 text-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50 h-12 text-lg" />
                                </label>
                                <label className="block text-lg text-gray-300">
                                    <span>Build:</span>
                                    <input type="text" value={build} onChange={(e) => setBuild(e.target.value)} className="mt-1 block w-full rounded-md border-gray-700 bg-gray-600 text-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50 h-12 text-lg" />
                                </label>
                            </div>
                        </div>
                        <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline block mx-auto">
                            Submit
                        </button>
                    </form>
                </div>
                <div className="w-1/2 bg-gray-800 p-8 rounded-lg opacity-75">
                    <img src='/images/pic.png' alt="Selected" className="max-w-full h-auto" />
                </div>
            </div>
        </div>
    );
};

export default Main;
