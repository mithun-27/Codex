import { useState } from 'react';

const LANGUAGES = [
    'Python', 'JavaScript', 'TypeScript', 'Java', 'C++', 'C#',
    'Go', 'Rust', 'Swift', 'Kotlin', 'PHP', 'Ruby', 'HTML/CSS',
    'SQL', 'Shell', 'Other'
];

const LanguageSelector = ({ selected, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div style={{ position: 'relative', width: '200px' }}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    width: '100%',
                    padding: '0.6rem 1rem',
                    background: 'var(--glass-bg)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--text-primary)',
                    textAlign: 'left',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
            >
                <span>{selected || 'Select Language'}</span>
                <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>▼</span>
            </button>

            {isOpen && (
                <div className="glass-panel" style={{
                    position: 'absolute',
                    top: '110%',
                    left: 0,
                    width: '100%',
                    maxHeight: '300px',
                    overflowY: 'auto',
                    zIndex: 50,
                }}>
                    {LANGUAGES.map(lang => (
                        <div
                            key={lang}
                            onClick={() => { onSelect(lang); setIsOpen(false); }}
                            style={{
                                padding: '0.5rem 1rem',
                                cursor: 'pointer',
                                background: selected === lang ? 'rgba(109, 40, 217, 0.2)' : 'transparent',
                                color: selected === lang ? 'var(--accent-primary)' : 'var(--text-secondary)',
                                transition: 'background 0.2s'
                            }}
                            onMouseEnter={(e) => {
                                if (selected !== lang) e.target.style.background = 'rgba(255,255,255,0.05)';
                                e.target.style.color = 'var(--text-primary)';
                            }}
                            onMouseLeave={(e) => {
                                if (selected !== lang) e.target.style.background = 'transparent';
                                if (selected !== lang) e.target.style.color = 'var(--text-secondary)';
                            }}
                        >
                            {lang}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LanguageSelector;
