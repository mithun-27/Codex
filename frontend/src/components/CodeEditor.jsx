import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-csharp';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-markup'; // HTML/XML
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-bash';
import 'prismjs/themes/prism-dark.css';

const CodeEditor = ({ code, setCode, language, placeholder }) => {

    const getHighlighter = (code) => {
        let langObj = languages.js; // default
        const langKey = language?.toLowerCase();

        if (langKey === 'python') langObj = languages.python;
        else if (langKey === 'java') langObj = languages.java;
        else if (langKey === 'c++' || langKey === 'cpp') langObj = languages.cpp;
        else if (langKey === 'go') langObj = languages.go;
        else if (langKey === 'rust') langObj = languages.rust;
        else if (langKey === 'html/css') langObj = languages.html;
        else if (langKey === 'sql') langObj = languages.sql;
        else if (langKey === 'shell' || langKey === 'bash') langObj = languages.bash;

        return highlight(code, langObj || languages.js);
    };

    return (
        <div className="glass-panel" style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            background: 'rgba(0,0,0,0.3)'
        }}>
            <div style={{ flex: 1, overflow: 'auto', padding: '1rem' }}>
                <Editor
                    value={code}
                    onValueChange={code => setCode(code)}
                    highlight={getHighlighter}
                    padding={10}
                    placeholder={placeholder || "// Paste your code here..."}
                    style={{
                        fontFamily: '"Fira code", "Fira Mono", monospace',
                        fontSize: 14,
                        minHeight: '100%',
                    }}
                    textareaClassName="code-editor-textarea"
                />
            </div>
        </div>
    );
};

export default CodeEditor;
