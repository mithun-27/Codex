import { useState, useEffect } from 'react';

const FileExplorer = ({ onSelectFile }) => {
    const [files, setFiles] = useState([]);
    const [currentPath, setCurrentPath] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchFiles = async (path) => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`http://localhost:8000/api/files?path=${path}`);
            if (!res.ok) throw new Error('Failed to fetch files');
            const data = await res.json();
            setFiles(data);
            setCurrentPath(path);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFiles('');
    }, []);

    const handleNavigate = (folderName) => {
        const newPath = currentPath ? `${currentPath}/${folderName}` : folderName;
        fetchFiles(newPath);
    };

    const handleBack = () => {
        if (!currentPath) return;
        const parts = currentPath.split('/');
        parts.pop();
        fetchFiles(parts.join('/'));
    };

    return (
        <div className="glass-panel" style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button onClick={handleBack} disabled={!currentPath} style={{ opacity: currentPath ? 1 : 0.5, padding: '0.2rem 0.5rem', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }}>
                    ←
                </button>
                <div style={{ fontSize: '0.9rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: 'var(--text-secondary)' }}>
                    root/{currentPath}
                </div>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '0.5rem' }}>
                {loading && <div style={{ padding: '1rem', color: 'var(--text-tertiary)' }}>Loading...</div>}
                {error && <div style={{ padding: '1rem', color: '#ef4444' }}>{error}</div>}

                {!loading && !error && files.map((file) => (
                    <div
                        key={file.name}
                        onClick={() => file.type === 'directory' ? handleNavigate(file.name) : onSelectFile(file.path)}
                        style={{
                            padding: '0.5rem 0.8rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            borderRadius: 'var(--radius-sm)',
                            color: file.type === 'directory' ? 'var(--accent-secondary)' : 'var(--text-primary)',
                            transition: 'background 0.2s',
                        }}
                        onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.05)'}
                        onMouseLeave={(e) => e.target.style.background = 'transparent'}
                    >
                        <span style={{ opacity: 0.7 }}>{file.type === 'directory' ? '📁' : 'aaa'}</span>
                        {file.name}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FileExplorer;
