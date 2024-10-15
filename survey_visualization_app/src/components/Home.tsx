import { useState } from "react";

export const HomePage = () => {
    const [text, setText] = useState<string>('');
    const [tone, setTone] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent) => {
        // Prevent default behaviour of form ... normally reloads page
        e.preventDefault();
        // Call API to analyze emotional tone here
        await analyzeTone(text);
    };

    const analyzeTone = async (text: string) => {
        console.log("Analyzing tone");
        setTone("Happy");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-6">Emotional Tone Detector</h1>
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
            {text.length > 0 && (
                <div className="mt-6 p-4">
                    <p className="text-lg">
                        <strong>Detected Tone:</strong> {tone}
                    </p>
                </div>
            )}
        </div>
    );
}