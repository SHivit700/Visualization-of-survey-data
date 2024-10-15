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
                return 'bg-green-100';
            case 'negative':
                return 'bg-red-100';
            case 'neutral':
                return 'bg-gray-200';
            default:
                return 'bg-white';
        }
    };

    // Return color based on tone for text color
    const getToneColor = (tone: string) => {
        switch (tone) {
            case 'positive':
                return 'text-green-500';
            case 'negative':
                return 'text-red-500';
            case 'neutral':
                return 'text-gray-500';
            default:
                return 'text-black';
        }
    };

    return (
        <div className={`flex flex-col items-center justify-center min-h-screen transition-all duration-500 ${getBackgroundColor(tone)}`}>
            <h1 className="text-4xl font-bold mb-6">Emotional Tone Detector</h1>

            <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-md w-11/12 md:w-1/2 lg:w-1/3">
                <textarea
                    className="w-full p-4 mb-4 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                    placeholder="Enter your text here..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all duration-300"
                >
                    {loading ? (
                        <div className="flex justify-center items-center">
                            <svg
                                className="animate-spin h-5 w-5 mr-2 text-white"
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
                        'Check'
                    )}
                </button>
            </form>

            {/* Display Error Message */}
            {error && (
                <div className="mt-4 text-red-500">
                    <p>{error}</p>
                </div>
            )}

            {/* Display Tone Result */}
            {displayTone && !error && !loading && (
                <div className={`mt-8 p-6 border rounded-lg bg-white shadow-lg w-11/12 md:w-1/2 lg:w-1/3 transition-all duration-300`}>
                    <p className={`text-2xl font-bold ${getToneColor(tone)}`}>
                        <strong>Detected Tone:</strong> {tone.charAt(0).toUpperCase() + tone.slice(1)}
                    </p>
                    <p className="mt-2 text-gray-700">
                        {tone === 'positive'
                            ? 'The text is primarily positive!'
                            : tone === 'negative'
                                ? 'The text has a negative tone.'
                                : 'The text appears to be neutral.'}
                    </p>
                </div>
            )}
        </div>
    );
};
