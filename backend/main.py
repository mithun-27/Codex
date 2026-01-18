from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
import os
import glob

app = FastAPI()

# Configure CORS
origins = [
    "http://localhost:5173",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))

class FileContent(BaseModel):
    path: str
    content: str
    language: str

@app.get("/")
def read_root():
    return {"message": "Codex AGI Backend is running", "base_dir": BASE_DIR}

@app.get("/api/health")
def health_check():
    return {"status": "healthy"}

@app.get("/api/files")
def get_files(path: str = ""):
    """
    List files in the given directory path relative to BASE_DIR.
    If path is empty, list BASE_DIR.
    """
    target_path = os.path.join(BASE_DIR, path)
    if not os.path.exists(target_path):
        raise HTTPException(status_code=404, detail="Directory not found")
    
    if not os.path.isdir(target_path):
        raise HTTPException(status_code=400, detail="Path is not a directory")

    items = []
    try:
        # Simple non-recursive list for now, or we can do a tree structure
        # Let's do a simple list of children with type
        with os.scandir(target_path) as it:
            for entry in it:
                # Skip .git, __pycache__, node_modules, venv for cleanliness
                if entry.name in ['.git', '__pycache__', 'node_modules', 'venv', '.gemini', '.agent']:
                    continue
                
                items.append({
                    "name": entry.name,
                    "type": "directory" if entry.is_dir() else "file",
                    "path": os.path.join(path, entry.name).replace("\\", "/")
                })
    except PermissionError:
        raise HTTPException(status_code=403, detail="Permission denied")
        
    return sorted(items, key=lambda x: (x['type'] != 'directory', x['name']))

@app.get("/api/read")
def read_file(path: str):
    """
    Read content of a specific file.
    """
    target_path = os.path.join(BASE_DIR, path)
    if not os.path.exists(target_path):
        raise HTTPException(status_code=404, detail="File not found")
        
    if not os.path.isfile(target_path):
        raise HTTPException(status_code=400, detail="Path is not a file")
        
    try:
        with open(target_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        ext = os.path.splitext(target_path)[1].lower()
        return {"content": content, "language": ext}
    except UnicodeDecodeError:
         return {"content": "Binary or non-UTF-8 file content not displayed.", "language": "binary"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/analyze")
async def analyze_code(request: dict):
    # Prioritize direct code input
    content = request.get("code")
    file_path = request.get("path") or request.get("filePath")
    analysis_type = request.get("type", "explain")
    
    # If no code provided, try reading from file (legacy support or if we add file loading back)
    if not content and file_path:
        target_path = os.path.join(BASE_DIR, file_path)
        if os.path.exists(target_path):
            try:
                with open(target_path, 'r', encoding='utf-8') as f:
                    content = f.read()
            except Exception as e:
                pass # Fail silently and let check below catch empty content

    if not content:
        raise HTTPException(status_code=400, detail="No code provided for analysis")

    # API Key provided by user (via environment variable)
    api_key = os.getenv("OPENROUTER_API_KEY")
    
    if not api_key:
         return {"result": "Configuration Error: No API Key found. Please set OPENROUTER_API_KEY environment variable."}

    # Real AI Call (OpenRouter / OpenAI Compatible)
    try:
        from openai import OpenAI
        
        client = OpenAI(
            base_url="https://openrouter.ai/api/v1",
            api_key=api_key,
            default_headers={
                "HTTP-Referer": "http://localhost:5173", # Site URL
                "X-Title": "Codex AGI", # Site Title
            }
        )
        
        prompt = ""
        if analysis_type == 'explain':
            prompt = f"Explain the following code in plain English. Focus on functionality, architecture, and logic. \n\nCODE:\n{content}"
        elif analysis_type == 'improve':
            prompt = f"Analyze the following code and suggest specific improvements for performance, security, and readability. Provide code snippets where applicable.\n\nCODE:\n{content}"
        else:
            prompt = f"Analyze this code:\n\n{content}"
            
        response = client.chat.completions.create(
            # Using the model specified by the user
            model="mistralai/devstral-2512:free", 
            messages=[
                {"role": "system", "content": "You are an expert software engineer and AGI coding assistant. Analyze the code provided deeply."},
                {"role": "user", "content": prompt}
            ]
        )
        
        return {"result": response.choices[0].message.content}
        
    except Exception as e:
        print(f"Error: {e}")
        return {"result": f"AI Analysis Failed: {str(e)}"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
