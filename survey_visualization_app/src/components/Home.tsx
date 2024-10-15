import { useState } from "react";
import { analyzeTone } from "../utils/api";

export const HomePage = () => {
    const [text, setText] = useState<string>('');
    const [tone, setTone] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [displayTone, setDisplayTone] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        // Prevent default behaviour of form ... normally reloads page
        e.preventDefault();

        if (text.length === 0) {
            setDisplayTone(false);
            setError("Please enter some text to analyze its tone.");
            return;
        }
        setError(null);
        setDisplayTone(true);

        // Call API to analyze emotional tone here
        const result = await analyzeTone(text);

        const sentimentScore = result?.documentSentiment?.score || 0;
        console.log(sentimentScore);
        if (sentimentScore > 0.25) {
            setTone('positive');
        } else if (sentimentScore < -0.25) {
            setTone('negative');
        } else {
            setTone('neutral');
        }
    };

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
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold   
 mb-6">Emotional Tone Detector</h1>
            <form onSubmit={handleSubmit} className="p-6 rounded-lg">
                <textarea
                    className="w-full p-3 mb-4 border rounded-lg"
                    placeholder="Enter your text here..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                >
                    Check
                </button>
            </form>
            {error && (
                <div className="mt-4 text-red-500">
                    <p>{error}</p>
                </div>
            )}
            {displayTone && !error && (
                <div className={`mt-6 p-4 border rounded-lg bg-white shadow-md ${getToneColor(tone)}`}>
                    <p className="text-lg">
                        <strong>Detected Tone:</strong> {tone}
                    </p>
                </div>
            )}
        </div>
    );
}