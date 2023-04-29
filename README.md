## Code verifier frontend

creando proyecto

```typescript
npx create-react-app code-frontend --template typescript
```

el proyecto  necesita el react-router-dom 
este  va a ser el sistema para entrutar la aplicacion

```typescript
npm i --save react-router-dom formik yup axios node-sass
```

formik yup (formularios)
axios (peticion)
node-sass (para trabajar con sass y css)

Se reemplazo node sass por dart-sass


. 
## Estructura del proyecto

dentro de src creamos carpetas:
components 
pages (paginas del proyecto, componentes que van a ser cargados con react dom)
services (servicio de authenticacion con axios)
utils/config (config de axios)

en utils/config crear archivo axios.config.ts


```typescript 

import axios from 'axios';

export default axios.create(
    {
        baseURL: 'http://localhost:8000/api', // Base URL will add the endpoints of our backend app
        responseType: 'json',
        timeout: 6000
    }
)
```

# Ahora creamos el services de authService.ts

```typescript 
import axios from '../utils/config/axios.config';

/**
 * Login Method
 * @param {string} email Email to login a user
 * @param {string} password Password to login a user
 * @returns 
 */
export const login = (email: string, password: string) => {

    // Declare Body to POST
    let body = {
        email: email,
        password: password
    }
    
    // send POST request to login endpoint
    // http://localhost:8000/api/auth/login
    return axios.post('/auth/login', body);
}

/**
 * Register Method
 * @param {string} name Name of user
 * @param {string} email Email of user
 * @param {string} password Password of user
 * @param {number} age Age of user
 * @returns 
 */
export const register = (name: string, email: string, password: string, age: number) => {

    // Declare Body to POST
    let body = {
        name: name,
        email: email,
        password: password,
        age: age
    }

    // Send POST request to register end point
    // http://localhost:8000/api/auth/register
    return axios.post('/auth/register', body);
}
```

# Dentro de componentes creamos carpeta form y alojamos formularios
Por lo tanto creamos  src/components/forms/LoginForm.tsx
y                     RegisterForm.tsx

LoginForm.tsx

```typescript
import React from 'react';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
/*
 * Con Yup, podremos definir un conjunto de reglas, y averiguar si los datos introducidos por el usuario las cumplen, o no. Para ello, su API provee de un sistema de creación de esquemas.  
 * Yup es una librería altamente declarativa. Tal y como veremos, su API es muy intuitiva, y fácil de seguir.
 * Validación de formularios
 */
import { login } from '../../services/authService';
import { AxiosResponse } from 'axios';

// Define Schema of validation with Yup
const loginSchema = Yup.object().shape(
    {
        email: Yup.string().email('Invalid Email Format').required('Email is required'),
        password: Yup.string().required('Password is required')
    }
);

// Login Component
const LoginForm = () => {
    
    // defined the initial credentials
    const initialCredentials = {
        email: '',
        password: ''
    }

    return (
        <div>
            <h4>Login Form</h4>
            {/* Formik to encapsulate a Form */}
            <Formik
                initialValues={ initialCredentials } //sopra
                validationSchema={ loginSchema }
                onSubmit={ async(values) => {
                    // await new Promise((response) => setTimeout(response, 2000));
                    // console.log("comprobando")
                    // alert(JSON.stringify(values, null, 2))
                    // console.table(values)

                    login(values.email, values.password).then((response: AxiosResponse) => { //import authservice

                        if(response.status === 200){
                            if(response.data.token){
                               console.table(response.data);
                               sessionStorage.setItem('sessionJWTToken', response.data.token);
                         } else {
                            throw new Error('Error Generating token')
                         }
                        } else {
                            throw new Error('Invalid Credentials')
                        }
                    }).catch((error) => console.error(`[LOGIN ERROR]: Something went wrong: ${error}`))
                }}
            >
                   {/* lo anterior fue la config de formik, ahora lo que viene la config
                de valores que hay que inyectar en el formulario*/}
                {
                    ({values, touched, errors, isSubmitting, handleChange, handleBlur}) => (
                        
                        <Form>
                        {/* Email Field */}
                        <label htmlFor="email">Email</label>
                        <Field id='email' type='email' name='email' placeholder='example@email.com'></Field>
                        
                        {/* Email Errors */}
                        {
                            errors.email && touched.email && (
                                <ErrorMessage name='email' component='div'></ErrorMessage>
                            )
                        }


                         {/* Password Field */}
                         <label htmlFor="password">Password</label>
                        <Field id='password' type='password' name='password' placeholder='example'></Field>
                        
                        {/* Password Errors */}
                        {
                            errors.password && touched.password && (
                                <ErrorMessage name='password' component='div'></ErrorMessage>
                            )
                        }

                        {/* SUBMIT FORM */}
                        <button type='submit'> Login </button>

                        {/* Message if the form is submitting */}
                        {
                            isSubmitting ? (<p>Checking credentials...</p>)
                            : null
                        }
                        </Form>
                    )
                }
                </Formik>
             
        </div>
    )
}

export default LoginForm;
```


# render del form
En la raiz del proyecto esta App.tsx
para renderizar:
```typescript
function App() {
  return (
    <div className="App">
      {/* Render Login Form */}
      <LoginForm />
    </div>
  );
}
```

seguimos con el formulario de registro
components/forms/RegisterForm.tsx
```typescript
```