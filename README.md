# 🔍 Custom Search Web UI

A modern, feature-rich search application powered by **Google Custom Search API** with optional **AI-powered summaries** using Ollama. Built with a sleek, responsive interface featuring dark mode, infinite scroll, and glassmorphism design.

![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.18-000000?style=flat-square&logo=express&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)

---

## ✨ Features

### Core Functionality
- 🔎 **Google Custom Search Integration** - Powerful web search using Google's API
- 🤖 **AI-Powered Summaries** - Get intelligent summaries of search results using Ollama (optional)
- ♾️ **Infinite Scroll** - Seamlessly load more results as you scroll
- 🌗 **Dark/Light Mode** - Toggle between themes with smooth transitions
- 📱 **Fully Responsive** - Works perfectly on desktop, tablet, and mobile devices

### UI/UX Highlights
- 💎 **Glassmorphism Design** - Modern, premium aesthetic with blur effects
- 🎨 **Smooth Animations** - Fade-in cards, hover effects, and micro-interactions
- 📐 **Resizable Panels** - Drag the divider to adjust search/results panel sizes
- 🔄 **Floating Search Button** - Quick access to search on mobile devices
- 📊 **Rich Search Insights** - View top sources, related topics, and content types

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- Google Custom Search API credentials
- [Ollama](https://ollama.ai/) (optional, for AI summaries)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/Search_modernize.git
   cd Search_modernize
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   API_KEY=your_google_api_key_here
   CX=your_custom_search_engine_id_here
   PORT=3000
   
   # Optional: Ollama configuration for AI summaries
   OLLAMA_URL=http://localhost:11434
   OLLAMA_MODEL=llama3.2
   ```

4. **Start the server**
   ```bash
   npm start
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

---

## 🔑 API Keys Setup

### Google Custom Search API

You **must** obtain your own API credentials to use this application:

1. **Get an API Key**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one
   - Navigate to **APIs & Services** → **Credentials**
   - Click **Create Credentials** → **API Key**
   - Copy your API key

2. **Create a Custom Search Engine**
   - Go to [Programmable Search Engine](https://programmablesearchengine.google.com/)
   - Click **Add** to create a new search engine
   - Configure your search settings (search the entire web or specific sites)
   - Copy the **Search Engine ID (CX)**

3. **Enable the API**
   - In Google Cloud Console, go to **APIs & Services** → **Library**
   - Search for "Custom Search API"
   - Click **Enable**

> ⚠️ **Important**: The Custom Search API provides **100 free queries per day**. Additional queries require billing setup ($5 per 1000 queries).

### Ollama Setup (Optional)

For AI-powered search summaries:

1. Install Ollama from [ollama.ai](https://ollama.ai/)
2. Pull a model:
   ```bash
   ollama pull llama3.2
   ```
3. Start the Ollama server:
   ```bash
   ollama serve
   ```

---

## 📁 Project Structure

```
Search_modernize/
├── server.js           # Express server & API routes
├── package.json        # Dependencies and scripts
├── .env                # Environment variables (create this)
├── .env.example        # Example environment file
├── .gitignore          # Git ignore rules
├── LICENSE             # MIT License
├── README.md           # This file
└── public/
    ├── index.html      # Main frontend application
    ├── icon.png        # App icon
    └── service-worker.js # PWA service worker
```

---

## 🛠️ Configuration Options

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `API_KEY` | ✅ Yes | - | Google API Key |
| `CX` | ✅ Yes | - | Custom Search Engine ID |
| `PORT` | No | `3000` | Server port |
| `OLLAMA_URL` | No | `http://localhost:11434` | Ollama API endpoint |
| `OLLAMA_MODEL` | No | `llama3.2` | LLM model for summaries |

---

## 🐛 Known Issues & Limitations

### API Limitations
| Issue | Description | Status |
|-------|-------------|--------|
| **100 Results Max** | Google Custom Search API returns a maximum of 100 results per query | API Limitation |
| **Daily Quota** | Free tier allows 100 queries/day | API Limitation |
| **Start Parameter** | `start` values > 91 return 400 error | Handled in code |

### UI/UX
| Issue | Description | Status |
|-------|-------------|--------|
| **Untitled Cards** | Some results may lack titles | ✅ Fixed (filtered out) |
| **Mobile Scroll** | Infinite scroll detection on some mobile browsers | ✅ Fixed |

### Performance
| Issue | Description | Workaround |
|-------|-------------|------------|
| **Slow AI Summaries** | LLM inference can be slow on low-end hardware | Increase `timeout` or use smaller model |
| **Ollama Not Running** | AI features fail if Ollama isn't started | Falls back to client-side summary |

---

## 🔮 Future Enhancements

### Planned Features
- [ ] 🔐 **User Authentication** - Save search history and preferences
- [ ] 📌 **Bookmarking** - Save favorite search results
- [ ] 🌐 **Multi-language Support** - Localized UI and search
- [ ] 📈 **Search Analytics** - Track popular queries and trends
- [ ] 🖼️ **Image Search Mode** - Dedicated image search tab
- [ ] 📰 **News Search Mode** - Filter for news articles
- [ ] 🗣️ **Voice Search** - Speech-to-text search input
- [ ] 📦 **PWA Offline Mode** - Cache results for offline viewing
- [ ] 🔗 **Share Results** - Generate shareable search links
- [ ] 🎨 **Custom Themes** - User-selectable color schemes


---

## 📄 License

This project is released into the public domain under The Unlicense. You are free to copy, modify, distribute, or use the project for any purpose, without any conditions.

---

<hr>
