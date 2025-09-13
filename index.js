import OpenAI from "openai";
import express from "express";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Initialize OpenAI client with API key from environment variable
const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// API endpoint for news search
app.post('/api/news', async (req, res) => {
    try {
        const { query = "What was a positive news story from today?" } = req.body;
        
        const response = await client.responses.create({
            model: "o3-deep-research",
            reasoning: { effort: "high" },

            tools: [
                { type: "web_search" },
            ],
            input: query,
            include: ["web_search_call.action.sources"]
        });
        
        res.json({
            success: true,
            data: {
                query: query,
                response: response.output_text
            }
        });
        
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// GET endpoint for quick test
app.get('/api/news', async (req, res) => {
    try {
        const response = await client.responses.create({
            model: "o3-deep-research",
            reasoning: { effort: "high" },
            tools: [
                { type: "web_search" },
            ],
            input: "search for the latest news about the charlie kirk incident",
        });
        
        res.json({
            success: true,
            data: {
                response: response.output_text
            }
        });
        
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'Server is running',
        timestamp: new Date().toISOString()
    });
});

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        message: "OpenAI News Search API",
        endpoints: {
            "GET /api/news": "Search for latest news (default: charlie kirk incident)",
            "POST /api/news": "Search for news with custom query",
            "GET /health": "Health check"
        },
        example: {
            "POST /api/news": {
                "body": {
                    "query": "search for the latest news about the charlie kirk incident"
                }
            }
        }
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📡 API endpoints:`);
    console.log(`   GET  http://localhost:${PORT}/api/news`);
    console.log(`   POST http://localhost:${PORT}/api/news`);
    console.log(`   GET  http://localhost:${PORT}/health`);
});