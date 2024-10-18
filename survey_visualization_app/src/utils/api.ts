export const analyzeTone = async (userText: string) => {
    // Get apiKey from .env
    const apiKey = process.env.REACT_APP_GOOGLE_CLOUD_API_KEY;
    // URL to Google Cloud Natural Language API
    const url = `https://language.googleapis.com/v1/documents:analyzeSentiment?key=${apiKey}`;

    // Create the request
    const document = {
        document: {
            type: 'PLAIN_TEXT',
            content: userText, 
        },
    };

    try {
        // POST request to the URL
        const response: Response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(document), // Sending body as JSON
        });

        // Parse the API response into JSON to extract score
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        // Log and throw an error if the API request fails
        console.error('API Error:', error);
        throw error;
    }
};
