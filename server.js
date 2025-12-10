require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve frontend files

if (!process.env.API_KEY || !process.env.CX) {
    console.error('CRITICAL ERROR: API_KEY or CX is missing in .env file. Server cannot start.');
    process.exit(1);
}

app.get('/search', async (req, res) => {
    const query = req.query.q;
    const start = parseInt(req.query.start) || 1;

    if (!query) {
        return res.status(400).json({ error: 'Query parameter "q" is required' });
    }

    // Google Custom Search API only allows up to 100 results (start values 1-91)
    // Return empty results if we've exceeded the limit
    if (start > 91) {
        console.log(`Start value ${start} exceeds Google API limit of 91. Returning empty results.`);
        return res.json({
            items: [],
            searchInformation: {
                totalResults: "0",
                formattedTotalResults: "0"
            },
            limitReached: true,
            message: "Google Custom Search API only returns up to 100 results."
        });
    }

    try {
        const apiKey = process.env.API_KEY;
        const cx = process.env.CX;
        const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${encodeURIComponent(query)}&start=${start}`;

        console.log('--- Debugging Google API Request ---');
        console.log('Query:', query);
        console.log('Start:', start);
        console.log('CX:', cx);
        console.log('API_KEY Length:', apiKey ? apiKey.length : 0);
        console.log('Request URL:', url.replace(apiKey, 'HIDDEN_KEY'));
        console.log('------------------------------------');

        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching search results:', error.message);
        if (error.response) {
            console.error('Google API Error Details:', JSON.stringify(error.response.data, null, 2));
        }
        res.status(500).json({ error: 'Failed to fetch search results' });
    }
});

// AI Summary endpoint using local Ollama
app.post('/summarize', async (req, res) => {
    const { query, results } = req.body;

    if (!query || !results || results.length === 0) {
        return res.status(400).json({ error: 'Query and results are required' });
    }

    // Ollama configuration
    const ollamaUrl = process.env.OLLAMA_URL || 'http://localhost:11434';
    const ollamaModel = process.env.OLLAMA_MODEL || 'llama3.2';

    try {
        // Prepare context from search results
        const context = results.slice(0, 5).map((item, i) =>
            `[${i + 1}] Title: ${item.title}\nSnippet: ${item.snippet || 'No snippet available'}`
        ).join('\n\n');

        const prompt = `You are a helpful search assistant. Based on the following search results for the query "${query}", provide a concise, accurate, and informative summary that directly answers the user's question.

Search Results:
${context}

Instructions:
- Provide a direct, factual answer to the query first
- Keep the summary to 2-3 sentences maximum
- Use the most recent and relevant information from the results
- If the query asks "who", "what", "when", etc., answer that specific question directly
- Do not include phrases like "Based on the search results" or "According to"
- Be concise and informative
- If there are dates or specific facts, include them

Summary:`;

        const ollamaResponse = await axios.post(`${ollamaUrl}/api/generate`, {
            model: ollamaModel,
            prompt: prompt,
            stream: false,
            options: {
                temperature: 0.3,
                num_predict: 100,  // Reduced for faster response
                top_p: 0.9,
                top_k: 40
            }
        }, {
            headers: { 'Content-Type': 'application/json' },
            timeout: 120000 // 120 second timeout for slow hardware
        });

        const aiText = ollamaResponse.data?.response || '';

        console.log('--- AI Summary Generated (Ollama) ---');
        console.log('Model:', ollamaModel);
        console.log('Query:', query);
        console.log('Summary:', aiText.substring(0, 100) + '...');
        console.log('--------------------------------------');

        res.json({ summary: aiText.trim() });

    } catch (error) {
        console.error('Error generating AI summary:', error.message);
        if (error.code === 'ECONNREFUSED') {
            console.error('Ollama server not running. Start it with: ollama serve');
        }
        // Return a fallback - don't fail the whole request
        res.json({
            summary: null,
            fallback: true,
            error: 'AI summary unavailable - Ollama may not be running'
        });
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
