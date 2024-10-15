import { useState } from "react";
import { analyzeTone } from "../utils/api";

export const HomePage = () => {
    const [text, setText] = useState<string>('');
    const [tone, setTone] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [displayTone, setDisplayTone] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false); // State to track loading status

    // Function to handle form submission and API call
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Reset the states when form is submitted
        setError(null);
        setDisplayTone(false);
        setLoading(true);
        setTone('')

        // Error: no text entered
        if (text.trim().length === 0) {
            setError("Please enter some text to analyze its tone.");
            setLoading(false);
            return;
        }

        // Call API to analyze emotional tone
        callAPIAndAnalyzeMood();
    };

    const callAPIAndAnalyzeMood = async () => {
        try {
            const result = await analyzeTone(text);
            const sentimentScore = result?.documentSentiment?.score || 0;
            // const sentimentScore = 0;
            
            // Set tone based on sentiment score
            if (sentimentScore > 0.25) {
                setTone('positive');
            } else if (sentimentScore < -0.25) {
                setTone('negative');
            } else {
                setTone('neutral');
            }

            setDisplayTone(true); // Display the tone result
        } catch (err) {
            setError("There was an error analyzing the tone. Please try again later.");
        } finally {
            setLoading(false); // Stop loading animation
        }
    }

    // Determine background color based on tone
    const getBackgroundColor = (tone: string) => {
        switch (tone) {
            case 'positive':
                return 'bg-gradient-to-br from-green-300 to-green-200';
            case 'negative':
                return 'bg-gradient-to-br from-red-300 to-red-200';
            case 'neutral':
                return 'bg-gradient-to-br from-gray-300 to-gray-200';
            default:
                return 'bg-pink-100';
        }
    };

    const getToneColor = (tone: string) => {
        switch (tone) {
            case 'positive':
                return 'text-green-900';
            case 'negative':
                return 'text-red-900';
            case 'neutral':
                return 'text-gray-900';
            default:
                return 'text-black';
        }
    };

    return (
        <div className={`flex flex-col items-center justify-center min-h-screen transition-all duration-700 ease-in-out ${getBackgroundColor(tone)}`}>
            {/* Heading */}
            <header className="text-center p-6">
                <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 mb-4 duration-300 hover:scale-105">
                    Emotional Tone Detector
                </h1>
            </header>

            {/* Form */}
            <form onSubmit={handleSubmit} className="shadow-lg rounded-3xl p-10 w-11/12 md:w-2/3 lg:w-1/2 transition-transform duration-500 hover:shadow-2xl hover:scale-105">
                <div className="relative">
                    <textarea
                        className={`w-full h-40 p-4 mb-4 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-300 transition-shadow duration-500 shadow-inner ${getBackgroundColor(tone)} border-none`}
                        placeholder="Type your text here..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        style={{ transition: 'background-color 0.5s ease, border 0.5s ease' }}
                    />
                    <span className="absolute right-4 top-4 text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h8m-4 4v-8" />
                        </svg>
                    </span>
                </div>
                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 px-6 rounded-full shadow-lg font-bold text-lg transition-transform transform hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-purple-300 duration-500 active:bg-white"
                >
                    {loading ? (
                        <div className="flex justify-center items-center">
                            <svg
                                className="animate-spin h-6 w-6 mr-2 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                />
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                />
                            </svg>
                            Processing...
                        </div>
                    ) : (
                        'Analyze Tone'
                    )}
                </button>
            </form>

            {error && (
                <div className="mt-6 p-4 text-red-500 rounded-lg w-11/12 md:w-2/3 lg:w-1/2 font-black text-center text-xl hover:scale-110 duration-300">
                    <p>{error}</p>
                </div>
            )}

            {displayTone && !error && !loading && (
                <div className={`mt-8 p-6 w-11/12 md:w-2/3 lg:w-1/2 transition-transform transform duration-500 hover:scale-105 ${getToneColor(tone)} text-center`}>
                    <p className={`text-3xl font-bold ${getToneColor(tone)}`}>
                        <strong>Detected Tone:</strong> {tone.charAt(0).toUpperCase() + tone.slice(1)}
                    </p>
                    <p className="mt-3 text-gray-700 text-lg">
                        {tone === 'positive'
                            ? 'This text reflects a positive tone. Keep spreading good vibes!'
                            : tone === 'negative'
                                ? 'This text carries a negative tone. It might evoke sadness or anger.'
                                : 'This text seems neutral. It is quite balanced in tone.'}
                    </p>
                </div>
            )}
        </div>
    );
};