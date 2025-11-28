const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(__dirname));

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Serve index.html for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// AI Agent Endpoint
app.post('/api/agent', async (req, res) => {
    try {
        const { query, context } = req.body;

        if (!process.env.GEMINI_API_KEY) {
            return res.json({ response: "I'm sorry, but the AI API key is not configured." });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = `
        You are an intelligent legal assistant for the "Tan App" case management system.
        
        Here is the current list of cases in JSON format:
        ${JSON.stringify(context)}

        User Question: "${query}"

        Instructions:
        1. Analyze the cases provided.
        2. Answer the user's question accurately based on the data.
        3. Keep the answer concise and conversational (suitable for voice output).
        4. If the user asks to perform an action (like "add a case"), explain that you can't do that yet but you can list or find cases.
        5. Respond in the same language as the user (Turkish).
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        res.json({ response: text });
    } catch (error) {
        console.error('Error calling Gemini:', error);
        res.status(500).json({ response: "Sorry, I encountered an error processing your request." });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
