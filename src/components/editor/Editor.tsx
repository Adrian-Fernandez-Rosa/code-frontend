import react from 'react';

import { Highlight, themes } from 'prism-react-renderer';

interface EditorProps {
    language?: any,
    children?: any,
    solution?: any

}

export const Editor = ( {language, children, solution}: EditorProps) => {

  
    
    return (
        <Highlight
        theme={themes.vsDark}
        code={children}
        language="typescript"
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre style={style}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                <span></span>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    )
}