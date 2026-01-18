import { useState, useEffect } from 'react';
import LanguageSelector from './components/LanguageSelector';
import CodeEditor from './components/CodeEditor';
import AnalysisPanel from './components/AnalysisPanel';
import logo from './assets/logo.png';

function App() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('Python');
  const [serverStatus, setServerStatus] = useState('checking...');

  useEffect(() => {
    fetch('http://localhost:8000/api/health')
      .then(res => res.json())
      .then(data => setServerStatus(data.status))
      .catch(() => setServerStatus('offline'));
  }, []);

  return (
    <div className="app-container" style={{ height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Header */}
      <header style={{
        height: '70px', // Increased height for logo
        padding: '0 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid var(--border-light)',
        background: 'rgba(5, 5, 8, 0.8)',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <img src={logo} alt="Codex AGI Logo" style={{ height: '45px', objectFit: 'contain' }} />
          <h1 style={{
            fontSize: '1.5rem',
            fontWeight: '800',
            letterSpacing: '0.05em',
            background: 'linear-gradient(to right, #fff, var(--accent-secondary))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 20px rgba(139, 92, 246, 0.3)'
          }}>
            CODEX_AGI
          </h1>
        </div>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>
          SYSTEM: <span style={{ color: serverStatus === 'healthy' ? '#4ade80' : '#ef4444' }}>{serverStatus.toUpperCase()}</span>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ flex: 1, display: 'flex', overflow: 'hidden', padding: '1rem', gap: '1rem' }}>

        {/* Left Panel: Input */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <LanguageSelector selected={language} onSelect={setLanguage} />
            <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>Paste your code below</div>
          </div>
          <CodeEditor code={code} setCode={setCode} language={language} placeholder={`// Enter your ${language} code here...`} />
        </div>

        {/* Right Panel: Analysis */}
        <div style={{ width: '40%', borderLeft: '1px solid var(--border-light)', paddingLeft: '1rem' }}>
          <AnalysisPanel code={code} filePath={`User Input (${language})`} />
        </div>
      </main>
    </div>
  );
}

export default App;
