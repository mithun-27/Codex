import { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeViewer = ({ filePath }) => {
    const [content, setContent] = useState('');
    const [language, setLanguage] = useState('text');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!filePath) return;

        const fetchContent = async () => {
            setLoading(true);
            try {
                const res = await fetch(`http://localhost:8000/api/read?path=${filePath}`);
                if (!res.ok) throw new Error('Failed to read file');
                const data = await res.json();
                setContent(data.content);
                // Map extension to prism language if needed, simple slice for now
                setLanguage(data.language.replace('.', '') || 'text');
            } catch (err) {
                setContent('Error reading file: ' + err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchContent();
    }, [filePath]);

    if (!filePath) {
        return (
            <div className="glass-panel" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-tertiary)' }}>
                Select a file to view content
            </div>
        );
    }

    return (
        <div className="glass-panel" style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ padding: '0.5rem 1rem', borderBottom: '1px solid var(--glass-border)', background: 'var(--glass-bg)', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                {filePath}
            </div>
            <div style={{ flex: 1, overflow: 'auto', fontSize: '0.9rem' }}>
                {loading ? (
                    <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>
                ) : (
                    <SyntaxHighlighter
                        language={language}
                        style={vscDarkPlus}
                        customStyle={{ margin: 0, height: '100%', background: 'transparent' }}
                        showLineNumbers={true}
                    >
                        {content}
                    </SyntaxHighlighter>
                )}
            </div>
        </div>
    );
};

export default CodeViewer;
