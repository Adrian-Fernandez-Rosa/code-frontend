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
        fontFamily: '"Dank Mono", "Fira Code", "monospace"',
        ...myTheme.plain //estilos principales

    }
}

// Highlight Component
const HighlightElement = (code: string) => (

    <Highlight
    theme={themes.shadesOfPurple}
    code={codeSnippet}
    language="tsx"
  >
    {({ className, style, tokens, getLineProps, getTokenProps }) => (
     <Fragment>
                {tokens.map((line, i) => (
                    <div {...getLineProps({ line: line, key: i })}>
                        {
                            line.map((token, key) =>
                                <span {...getTokenProps({ token, key })} />

                            )
                        }
                    </div>
                ))}
     </Fragment>
    )}
  </Highlight>
);

export const NewEditor = () => {

    const [code, setCode] = useState(codeSnippet);

    const handleChange = (newCode: string) => {
        setCode(newCode)
    }

    return (
        <Editor
            value={code}
            onValueChange={handleChange}
            highlight={HighlightElement}
            padding={10}
            style={styles.root}
        />
    )

}