export const analyzeTone = async (text: string) => {
    const apiKey = process.env.REACT_APP_GOOGLE_CLOUD_API_KEY;
    const url = `https://language.googleapis.com/v1/documents:analyzeSentiment?key=${apiKey}`;

    const document = {
        document: {
            type: 'PLAIN_TEXT',
            content: text,
        },
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(document),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};
