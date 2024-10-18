# Visualization-of-survey-data
This repository contains a project for the visualization of survey data using AI-based sentiment analysis. It uses the Google Cloud Natural Language API to process and analyze text data, providing insights into the sentiments expressed in the user's input. Sentiment analysis is used to categorize text as positive, negative, or neutral. 

To set up the project locally, follow these steps:
-> Clone the repo
-> "npm install" should install all necessary dependancies.
-> To use the LLM, you need to get an apiKey from google cloud services by creating a project and enabling Cloud Natural Language API and then generating an API key.
-> Create a .env with the API key in the format("REACT_APP_GOOGLE_CLOUD_API_KEY={apiKey}")


If doing the above always returns the mood as neutral, then this might happen due to quota limitations or misconfiguration. Please reach out to me if this persists, and I will run the program with my API key for testing.

For running the program on mock data, you can uncomment line 40 on "Home.tsx" and set the value as > 0.25 for positive tone, < -0.25 for negative tone and between the two for the default tone. If doing so then comment lines 37 and 38.