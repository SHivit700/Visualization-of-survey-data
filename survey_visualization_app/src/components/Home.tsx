import { useRef, useState } from "react";
import { analyzeTone } from "../utils/api";
import positiveImage from "../assets/Positive.jpg"
import negativeImage from "../assets/Negative.jpg"
import neutralImage from "../assets/Neutral.jpg"

export const HomePage = () => {
    const [text, setText] = useState<string>(''); // User's input text 
    const [error, setError] = useState<string | null>(null); // For when input text is not valid
    const [tone, setTone] = useState<string>("default"); // Positive, Negative, Neutral or Default
    const [loading, setLoading] = useState<boolean>(false); // State to track loading status
    const [activeIndex, setActiveIndex] = useState<number>(0); // State to track the active card

    // Function to handle form submission and API call
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Reset the states when form is submitted
        setError(null);
        setLoading(true);
        setActiveIndex(0); // Reset active card
        setTone("default");

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
            // For testing
            // const sentimentScore = 1; 

            // Set tone based on sentiment score
            if (sentimentScore > 0.25) {
                setActiveIndex(1);
                setTone("Positive");
            } else if (sentimentScore < -0.25) {
                setActiveIndex(2);
                setTone("Negative");
            } else {
                setActiveIndex(3);
                setTone("Neutral");
            }

        } catch (err) {
            setError("There was an error analyzing the tone. Please try again later.");
        } finally {
            setLoading(false); // Stop loading animation
        }
    }

    const resetTone = () => {
        setText('');
        setError(null);
        setActiveIndex(0)
        setTone("default")
    };

    // Get the background color for screen and button based on the tone
    const getBackgroundForScreenAndButton = (cardTone: string) => {
        switch (cardTone) {
            case 'Positive':
                return ' bg-[#89c7c6] ';
            case 'Negative':
                return ' bg-[#ffaead] ';
            case 'Neutral':
                return 'bg-gradient-to-br from-[#d8c8b4] to-[#bfa687]';
            default:
                return 'bg-[#2b2738]';
        }
    };

    // Returns background color for the input form 
    const getFormBackground = (cardTone: string) => {
        switch (cardTone) {
            case 'Positive':
                return 'bg-[#9ed0d2] focus:ring-purple-300 ';
            case 'Negative':
                return 'bg-[#FFB6C1] ';
            case 'Neutral':
                return 'bg-[#cdc3b6]';
            default:
                return 'bg-[#3b364c] focus:ring-purple-300';
        }
    };

    // Returns text color based on tone 
    const getHeadingTextColor = (cardTone: string) => {
        switch (cardTone) {
            case 'Positive':
                return 'text-[#0b837f]';
            case 'Negative':
                return 'text-[#d333337b] ';
            case 'Neutral':
                return 'text-[#99733b]';
            default:
                return 'text-white';
        }
    };

    return (
        <div className={`min-h-screen ${getBackgroundForScreenAndButton(tone)} flex flex-col items-center duration-1000 ease-in-out pt-20`}>
            <div className="flex flex-col w-full max-w-[800px]">
                <header className="text-center p-6 mb-10">
                    <h1 className={`text-5xl font-extrabold mb-4 ${getHeadingTextColor(tone)}` } >Emotional Tone Detector</h1>
                    <p className={`text-lg text-white ${getHeadingTextColor(tone)}`}>
                        A tone analyzer that can assess the sentiment of your text and categorize it as positive, neutral, or negative.
                    </p>
                </header>

                <form onSubmit={handleSubmit} className={`shadow-lg rounded-3xl p-10 w-full ${getFormBackground(tone)} mb-4`}>
                    <textarea
                        className={`w-full h-40 p-4 mb-4 rounded-xl focus:ring-4 shadow-inner border-none text-white ${getFormBackground(tone)} ${getHeadingTextColor(tone)}`}
                        placeholder="Type your text here..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <button
                        type="submit"
                        className={`w-full ${getBackgroundForScreenAndButton(tone)} ${getHeadingTextColor(tone)} text-white py-3 rounded-full shadow-lg font-bold text-lg transition-transform transform hover:scale-105`}
                    >
                        {loading ? 'Processing...' : 'Analyze Tone'}
                    </button>
                </form>
                {error && <div className="mt-6 p-4 text-red-500 rounded-lg text-center">{error}</div>}
                <button onClick={resetTone} className="mt-4 text-blue-500 underline text-lg w-full">Reset</button>
            </div>

            {/* Carousel Section */}
            <div className="flex overflow-hidden h-[200px] m-10">
                <div className="flex transition-transform duration-1000 ease-in-out" style={{
                    transform: `translateX(-${activeIndex * 100}%)` // Calculate transform based on activeIndex
                }}>
                    {/* Default Tone Card */}
                    <div className="w-full flex-shrink-0 h-full">
                        <div className={`${getBackgroundForScreenAndButton('default')} w-full h-full rounded-lg flex items-center justify-center text-white`}>
                            <p className="text-xl"></p>
                        </div>
                    </div>

                    {/* Positive Tone Card */}
                    <div className="w-full flex-shrink-0 h-full flex items-center justify-center">
                        <img
                            src={positiveImage}
                            alt="Positive Tone"
                            className="h-full w-auto"
                        />
                    </div>

                    {/* Negative Tone Card */}
                    <div className="w-full flex-shrink-0 h-full flex items-center justify-center">
                        <img
                            src={negativeImage}
                            alt="Negative Tone"
                            className="h-full w-auto"
                        />
                    </div>

                    {/* Neutral Tone Card */}
                    <div className="w-full flex-shrink-0 h-full flex items-center justify-center">
                        <img
                            src={neutralImage}
                            alt="Neutral Tone"
                            className="h-1/3 w-auto"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};