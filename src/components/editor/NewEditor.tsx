import React, { Fragment, useState } from 'react';
import Editor from 'react-simple-code-editor';
import { Highlight, themes } from "prism-react-renderer"



const myTheme = themes.nightOwl;

const codeSnippet: string = `
async function getAverage() {
    try {
      const response = await axios.get<IUser[]>('https://www.cooperatividadreal.com.ar/users');
      const usuarios = response.data;
      const notas = usuarios.flatMap(usuario => usuario.notas);
      const promedio = notas.reduce((suma, nota) => suma + nota, 0) / notas.length;
      console.log(\`El promedio de notas de los usuarios es: \${promedio}\`);
    } catch (error) {
      console.error(error);
    }
  }

`

// Define Styles for Editor
const styles: any = {
  root: {
    boxSizing: 'border-box',
    fontFamily: '"Dank Mono", "Fira Code", monospace',
    ...themes.nightOwl.plain //estilos principales

  }
}


const languages: string[] = [
  "tsx",
  "typescript",
  "javascript",
  "jsx",
  "python",
  "java",
  "go"
]

// Highlight Component
const HighlightElement2: any = (code: string, language: string) => (
  <Highlight  theme={myTheme} code={code} language={languages[0]}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <Fragment>
              {tokens.map((line, i) => (
                  <div {...getLineProps({ line, key: i })}>
                      {line.map((token, key) => <span {...getTokenProps({ token, key })} />)}
                  </div>
              ))}
          </Fragment>
      )}
  </Highlight>
);



export const NewEditor = () => {

  const [code, setCode] = useState(codeSnippet);
  const [languageSelected, setLanguageSelected] = useState(languages[0]);
 
  const handleLanguageChange = (newValue: any) => {
    setLanguageSelected(newValue);
  }

  const handleCodeChange = (newCode: string) => {
    setCode(newCode)
  }


  return (

    <div>
      <select>
        { languages.map((language, index) => (
          <option onChange={(value) => handleLanguageChange(value)} value={language} key={index}>{language}</option>
        ))}
      </select>
      <Editor
        value={code}
        onValueChange={handleCodeChange}
        highlight={HighlightElement2}
        padding={10}
        style={styles.root}
      />
    </div>

  )

}