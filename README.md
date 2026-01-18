# Codex AGI 🧠💻

> **AI-Powered Code Analysis & Explanation Engine**  
> *Built by [mithun-27](https://github.com/mithun-27)*

Codex AGI is a modern, privacy-focused code analysis tool that helps developers understand complex code snippets in seconds. Instead of scanning your entire file system, it provides a secure **AI Playground** where you can paste code, select your language, and receive instant, plain-English explanations and improvement suggestions.

### Codex Dashboard

<img width="1917" height="865" alt="image" src="https://github.com/user-attachments/assets/1255e3a2-658c-4257-94e7-85ebf300e52e" />


## ✨ Features

- **🛡️ Secure User Input**: No invasve file scanning. Paste your code directly into the secure editor.
- **🎨 Syntax Highlighting**: Beautiful, readable code editor supporting Python, JS, Java, C++, Go, Rust, and more.
- **🤖 Advanced AI Analysis**: Powered by **OpenRouter (Mistral/Gemini)** for deep, context-aware code explanations.
- **⚡ Real-Time Improvements**: Get instant suggestions for refactoring, performance optimization, and security fixes.
- **💎 Premium UI**: A sleek, "Deep Space" dark mode interface designed for focus and clarity.

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, Vanilla CSS (Glassmorphism), PrismJS, React Markdown.
- **Backend**: Python 3.10+, FastAPI, Uvicorn, OpenAI SDK (for OpenRouter).
- **AI**: Integration with OpenRouter API (Mistral Devstral / Google Gemini).

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+)
- Python (v3.8+)
- An API Key from [OpenRouter](https://openrouter.ai/)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/mithun-27/codex-agi.git
    cd codex-agi
    ```

2.  **Setup Backend**
    ```bash
    cd backend
    python -m venv venv
    # Windows
    ./venv/Scripts/activate
    # Mac/Linux
    # source venv/bin/activate
    
    pip install -r requirements.txt
    ```

3.  **Setup Frontend**
    ```bash
    cd frontend
    npm install
    ```

### Running the App

1.  **Start Backend** (Terminal 1)
    ```bash
    cd backend
    uvicorn main:app --reload
    ```

2.  **Start Frontend** (Terminal 2)
    ```bash
    cd frontend
    npm run dev
    ```

3.  Open **http://localhost:5173** in your browser.

## 📸 Screenshots

### code input:
<img width="1896" height="856" alt="image" src="https://github.com/user-attachments/assets/70db0b4e-eb3d-4456-b133-cbd40e9e3205" />

---
### code output:
<img width="1917" height="865" alt="image" src="https://github.com/user-attachments/assets/aecdd5da-0a68-454f-a73d-038ffe062872" />



## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


---
*Built with ❤️ by [mithun-27](https://github.com/mithun-27)*
