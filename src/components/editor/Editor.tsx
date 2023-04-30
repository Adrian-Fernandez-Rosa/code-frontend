import react from 'react';

import { Highlight, themes } from 'prism-react-renderer';

interface EditorProps {
    language?: any,
    children?: any,

}

export const Editor = ( {language, children}: EditorProps) => {

    const codeExample = `
(function someDemo() {
var test ="Hello World!"
console.log(test)
})();
//hola
return () => <App />
    `
    return (
        <Highlight
        theme={themes.vsDark}
        code={codeExample}
        language="jsx"
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