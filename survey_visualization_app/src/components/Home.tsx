import { useState } from "react";
import { analyzeTone } from "../utils/api";

export const HomePage = () => {
    const [text, setText] = useState<string>('');
    const [tone, setTone] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [displayTone, setDisplayTone] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false); // State to track loading status
    const [activeIndex, setActiveIndex] = useState<number>(0); // State to track the active card

    // Function to handle form submission and API call
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Reset the states when form is submitted
        setError(null);
        setDisplayTone(false);
        setLoading(true);
        setTone('')
        setActiveIndex(0); // Reset active card

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
            // const result = await analyzeTone(text);
            // const sentimentScore = result?.documentSentiment?.score || 0;
            const sentimentScore = 0;

            // Set tone based on sentiment score
            if (sentimentScore > 0.25) {
                setTone('positive');
                setActiveIndex(1);
            } else if (sentimentScore < -0.25) {
                setTone('negative');
                setActiveIndex(2);
            } else {
                setTone('neutral');
                setActiveIndex(3);
            }

            setDisplayTone(true); // Display the tone result
        } catch (err) {
            setError("There was an error analyzing the tone. Please try again later.");
        } finally {
            setLoading(false); // Stop loading animation
        }
    }

    const resetTone = () => {
        setText('');
        setTone('default');
        setDisplayTone(false);
        setError(null);
        setActiveIndex(0)
    };

    const getCarouselTransform = (index: number) => {
        switch (index) {
            case 0: return 'translate-x-0';            // Default card
            case 1: return '-translate-x-[100%]';      // Positive card
            case 2: return '-translate-x-[200%]';      // Negative card
            case 3: return '-translate-x-[300%]';      // Neutral card
            default: return 'translate-x-0';
        }
    };

    // Get the card classes based on the tone
    const getCardClass = (cardTone: string) => {
        switch (cardTone) {
            case 'positive':
                return 'bg-gradient-to-br from-green-400 to-green-300';
            case 'negative':
                return 'bg-gradient-to-br from-red-400 to-red-300';
            case 'neutral':
                return 'bg-gradient-to-br from-gray-400 to-gray-300';
            default:
                return 'bg-gray-400';
        }
    };

    return (
        <div className="min-h-screen bg-[#2b2738] flex items-center justify-center">
            <div className="w-1/2">
                {/* Form Section */}
                <header className="text-center p-6 mb-10">
                    <h1 className="text-5xl font-extrabold text-white mb-4">Emotional Tone Detector</h1>
                    <p className="text-lg text-white">
                        A tone analyzer that can assess the sentiment of your text and categorize it as positive, neutral, or negative.
                    </p>
                </header>

                <form onSubmit={handleSubmit} className="shadow-lg rounded-3xl p-10 w-full bg-[#3b364c]">
                    <textarea
                        className="w-full h-40 p-4 mb-4 rounded-xl focus:ring-4 focus:ring-purple-300 shadow-inner bg-[#3b364c] border-none text-white"
                        placeholder="Type your text here..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 rounded-full shadow-lg font-bold text-lg transition-transform transform hover:scale-105"
                    >
                        {loading ? 'Processing...' : 'Analyze Tone'}
                    </button>
                </form>
                {error && <div className="mt-6 p-4 text-red-500 rounded-lg text-center">{error}</div>}
                <button onClick={resetTone} className="mt-4 text-blue-500 underline text-lg w-full">Reset</button>
            </div>

            {/* Carousel Section */}
            <div className="relative w-1/3 h-48 overflow-hidden">
                <div
                    className={`flex transition-transform duration-500 ease-in-out ${getCarouselTransform(activeIndex)}`}
                >
                    {/* Default Tone Card */}
                    <div className="w-full flex-shrink-0">
                        <div className={`${getCardClass('default')} w-full h-48 rounded-lg flex items-center justify-center text-white`}>
                            <p className="text-xl">Default</p>
                        </div>
                    </div>

                    {/* Positive Tone Card */}
                    <div className="w-full flex-shrink-0">
                        <div className={`${getCardClass('positive')} w-full h-48 rounded-lg flex items-center justify-center text-white`}>
                            <p className="text-xl">Positive</p>
                        </div>
                    </div>

                    {/* Negative Tone Card */}
                    <div className="w-full flex-shrink-0">
                        <div className={`${getCardClass('negative')} w-full h-48 rounded-lg flex items-center justify-center text-white`}>
                            <p className="text-xl">Negative</p>
                        </div>
                    </div>

                    {/* Neutral Tone Card */}
                    <div className="w-full flex-shrink-0">
                        <div className={`${getCardClass('neutral')} w-full h-48 rounded-lg flex items-center justify-center text-white`}>
                            <p className="text-xl">Neutral</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};