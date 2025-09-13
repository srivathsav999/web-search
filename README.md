# OpenAI Search API

A Node.js web server that provides API endpoints for searching news using OpenAI's GPT models with web search capabilities.

## 🚀 Features

- **Web Search Integration**: Uses OpenAI's web search tools to find real-time news
- **RESTful API**: Clean HTTP endpoints for easy integration
- **Customizable Queries**: Send custom search queries via POST requests
- **Error Handling**: Comprehensive error handling and logging
- **Environment Configuration**: Secure API key management with dotenv

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- OpenAI API key

## 🛠️ Installation

1. **Clone or download the project**
   ```bash
   git clone <your-repo-url>
   cd gift
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create a .env file in the project root
   echo "OPENAI_API_KEY=your-openai-api-key-here" > .env
   ```

4. **Get your OpenAI API key**
   - Visit [OpenAI Platform](https://platform.openai.com/api-keys)
   - Create a new API key
   - Replace `your-openai-api-key-here` in the `.env` file with your actual key

## 🏃‍♂️ Running the Server

```bash
node index.js
```

The server will start on `http://localhost:3000` by default.

## 📡 API Endpoints

### 1. **GET** `/api/news`
Returns news about the Charlie Kirk incident (default query).

**Example:**
```bash
curl http://localhost:3000/api/news
```

### 2. **POST** `/api/news`
Search for news with a custom query.

**Request Body:**
```json
{
  "query": "your search query here"
}
```

**Example:**
```bash
curl -X POST http://localhost:3000/api/news \
  -H "Content-Type: application/json" \
  -d '{"query": "latest developments in artificial intelligence"}'
```

### 3. **GET** `/health`
Health check endpoint.

**Example:**
```bash
curl http://localhost:3000/health
```

### 4. **GET** `/`
API documentation and available endpoints.

**Example:**
```bash
curl http://localhost:3000/
```

## 📝 Response Format

All API responses follow this structure:

```json
{
  "success": true,
  "data": {
    "query": "your search query",
    "response": "AI-generated news response with web search results..."
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Error message description"
}
```

## 🧪 Testing with Postman

### Basic Setup:
1. **Method**: `POST`
2. **URL**: `http://localhost:3000/api/news`
3. **Headers**: `Content-Type: application/json`
4. **Body** (raw JSON):

```json
{
  "query": "What are the latest developments in renewable energy?"
}
```

### Example Queries:
```json
// Technology news
{
  "query": "latest breakthroughs in quantum computing"
}

// Sports news
{
  "query": "latest results from major sports events this week"
}

// Positive news
{
  "query": "What was a positive news story from today?"
}

// Specific incident
{
  "query": "search for the latest news about the charlie kirk incident"
}
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | Your OpenAI API key | Yes |
| `PORT` | Server port (default: 3000) | No |

### Model Configuration

The API currently uses:
- **Model**: `gpt-4o`
- **Tools**: Web search enabled
- **Max Tokens**: Configurable in the code

## 📁 Project Structure

```
gift/
├── index.js              # Main server file
├── package.json          # Dependencies and scripts
├── .env                  # Environment variables (create this)
├── .gitignore           # Git ignore rules
└── README.md            # This file
```

## 🚨 Troubleshooting

### Common Issues:

1. **"Missing credentials" error**
   - Make sure your `.env` file exists and contains a valid `OPENAI_API_KEY`
   - Verify your API key is active on the OpenAI platform

2. **"Port already in use" error**
   - Change the port in your `.env` file: `PORT=3001`
   - Or kill the process using port 3000

3. **API rate limits**
   - Check your OpenAI usage limits
   - Consider implementing rate limiting in your application

4. **Server not starting**
   - Ensure all dependencies are installed: `npm install`
   - Check Node.js version: `node --version`

## 🔒 Security Notes

- Never commit your `.env` file to version control
- Keep your OpenAI API key secure
- Consider implementing authentication for production use
- Add rate limiting for production deployments

## 📊 Usage Examples

### JavaScript/Node.js
```javascript
const response = await fetch('http://localhost:3000/api/news', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    query: 'latest AI developments'
  })
});

const data = await response.json();
console.log(data.data.response);
```

### Python
```python
import requests

response = requests.post('http://localhost:3000/api/news', 
  json={'query': 'latest AI developments'})
data = response.json()
print(data['data']['response'])
```

### cURL
```bash
curl -X POST http://localhost:3000/api/news \
  -H "Content-Type: application/json" \
  -d '{"query": "latest AI developments"}'
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Review the OpenAI API documentation
3. Open an issue in the repository

---

**Happy coding! 🎉**
