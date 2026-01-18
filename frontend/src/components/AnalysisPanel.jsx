import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import './AnalysisPanel.css';

const AnalysisPanel = ({ filePath, code }) => {
    const [activeTab, setActiveTab] = useState('explain'); // 'explain' | 'improve'
    const [analysis, setAnalysis] = useState({ explain: '', improve: '' });
    const [loading, setLoading] = useState(false);

    const handleAnalyze = async (type) => {
        if (!filePath && !code) return;
        setLoading(true);
        try {
            const res = await fetch('http://localhost:8000/api/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ filePath, code, type }),
            });
            const data = await res.json();
            setAnalysis(prev => ({ ...prev, [type]: data.result }));
        } catch (err) {
            setAnalysis(prev => ({ ...prev, [type]: 'Error: ' + err.message }));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="glass-panel" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', borderBottom: '1px solid var(--glass-border)' }}>
                <button
                    onClick={() => setActiveTab('explain')}
                    style={{
                        flex: 1,
                        padding: '1rem',
                        color: activeTab === 'explain' ? 'var(--text-primary)' : 'var(--text-secondary)',
                        borderBottom: activeTab === 'explain' ? '2px solid var(--accent-primary)' : 'none',
                        background: activeTab === 'explain' ? 'rgba(255,255,255,0.02)' : 'transparent'
                    }}
                >
                    Explanation
                </button>
                <button
                    onClick={() => setActiveTab('improve')}
                    style={{
                        flex: 1,
                        padding: '1rem',
                        color: activeTab === 'improve' ? 'var(--text-primary)' : 'var(--text-secondary)',
                        borderBottom: activeTab === 'improve' ? '2px solid var(--accent-secondary)' : 'none',
                        background: activeTab === 'improve' ? 'rgba(255,255,255,0.02)' : 'transparent'
                    }}
                >
                    Improvements
                </button>
            </div>

            <div style={{ flex: 1, padding: '1rem', overflowY: 'auto' }}>
                {!analysis[activeTab] && !loading && (
                    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                        <p style={{ color: 'var(--text-tertiary)', marginBottom: '1rem' }}>
                            {activeTab === 'explain' ? 'Get a detailed plain-English explanation of this code.' : 'Get suggestions to optimize and improve this code.'}
                        </p>
                        <button
                            onClick={() => handleAnalyze(activeTab)}
                            disabled={!filePath && !code}
                            style={{
                                background: `var(--accent-${activeTab === 'explain' ? 'primary' : 'secondary'})`,
                                color: 'white',
                                padding: '0.6rem 1.2rem',
                                borderRadius: 'var(--radius-md)',
                                boxShadow: 'var(--shadow-glow)',
                                opacity: (filePath || code) ? 1 : 0.5
                            }}
                        >
                            Generate {activeTab === 'explain' ? 'Explanation' : 'Improvements'}
                        </button>
                    </div>
                )}

                {loading && (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        <div className="glow-effect" style={{ width: '40px', height: '40px', background: 'white', borderRadius: '50%', opacity: 0.1 }}></div>
                        <span style={{ marginLeft: '1rem' }}>Analyzing...</span>
                    </div>
                )}

                {analysis[activeTab] && !loading && (
                    <div className="markdown-content">
                        <ReactMarkdown>
                            {analysis[activeTab]}
                        </ReactMarkdown>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AnalysisPanel;
