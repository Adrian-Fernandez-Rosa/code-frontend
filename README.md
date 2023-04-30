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
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { AxiosResponse } from 'axios';

import { register } from '../../services/authService';


const RegisterForm = () => {

    const initialValues = {
        name: '',
        email: '',
        password: '',
        confirm: '',
        age: 18,
    }


    const registerSchema = Yup.object().shape({
        name: Yup.string()
          .min(6, 'Username must have 6 letters minimum')
          .max(12, 'Username must have maximum 12 letters')
          .required('Username is required'),
        email: Yup.string()
          .email('Invalid email format')
          .required('Email is required'),
        password: Yup.string()
          .min(8, 'Password too short')
          .required('Password is required'),
        confirm: Yup.string()
          .test('passwords-match', 'Passwords must match', function (value) {
            return this.parent.password === value;
          })
          .required('You must confirm your password'),
        age: Yup.number()
          .min(10, 'You must be over 10 years old')
          .required('Age is required'),
      });

      return (
        <div>
            <h4>Register as a new user</h4>
            {/* Formik wrapper */ }
            <Formik
            initialValues={ initialValues}
            validationSchema={ registerSchema}
            onSubmit= { async(values) => {
                register(values.name, values.email, values.password, values.age).then((response: AxiosResponse) => {
                    if(response.status === 201){
                        console.log('User registered correctly');
                        console.log(response.data);
                        alert('User registered correctly')
                    } else {
                        throw new Error('Error in registry')
                    }
                }).catch((error) => console.error(`[Register ERROR]: Something went wrong: ${error}`))
            }}
            >
            {
                    ({ values, touched, errors, isSubmitting, handleChange, handleBlur }) => (
                        <Form>

                            {/* Name Field */}
                            <label htmlFor='name' >Name</label>
                            <Field id='name' type='text' name='name' placeholder='Your Name' />

                            {/* Name Errors */}
                            {
                                errors.name && touched.name && (
                                    <ErrorMessage name='name' component='div'></ErrorMessage>
                                )
                            }


                            {/* Email Field */}
                            <label htmlFor='email' >Email</label>
                            <Field id='email' type='email' name='email' placeholder='example@email.com' />

                            {/* Email Errors */}
                            {
                                errors.email && touched.email && (
                                    <ErrorMessage name='email' component='div'></ErrorMessage>
                                )
                            }

                            {/* Password Field */}
                            <label htmlFor='password' >Password</label>
                            <Field id='password' type='password' name='password' placeholder='Password' />

                            {/* Password Errors */}
                            {
                                errors.password && touched.password && (
                                    <ErrorMessage name='password' component='div'></ErrorMessage>
                                )
                            }

                            {/* Confirm Password Field */}
                            <label htmlFor='confirm' >Confirm Password</label>
                            <Field id='confirm' type='password' name='confirm' placeholder='Confirm your password' />

                            {/* Confim Password Errors */}
                            {
                                errors.confirm && touched.confirm && (
                                    <ErrorMessage name='confirm' component='div'></ErrorMessage>
                                )
                            }


                            {/* Age Field */}
                            <label htmlFor='age' >age</label>
                            <Field id='age' type='number' name='age' />

                            {/* Password Errors */}
                            {
                                errors.age && touched.age && (
                                    <ErrorMessage name='age' component='div'></ErrorMessage>
                                )
                            }

                            {/* SUBMIT FORM */}
                            <button type='submit' >Register</button>

                            {/* Message if the form is submitting */}
                            {
                                isSubmitting ? 
                                    (<p>Sending data to registry...</p>) 
                                    : null
                            }

                        </Form>
                    )
                }

            </Formik>
        </div>
      )

    }
export default RegisterForm;    
```

## Ahora empezaremos con el sistema de rutas.
creamos archivos similares en src/pages
HomePage.tsx, KatasDetailPage.tsx, KatasPages.tsx, LoginPage.tsx, RegisterPage.tsx)

```typescript
/* eslint-disable no-unreachable */
import React from "react";


export const HomePage = () => {
    return 
     // eslint-disable-next-line no-lone-blocks
     (
        <div>
            <h1>
                Home Page
            </h1>
        </div>
     )
}
```

ahora haremos el enrutado en App.ts

```typescript 

import React from 'react';
import './App.css';

// React Router DOM Imports
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { KatasPage } from './pages/KatasPages';
import { KatasDetailPage } from './pages/KatasDetailPage';

// import LoginForm from './components/forms/LoginForm';
// import RegisterForm from './components/forms/RegisterForm';

function App() {
  return (
    <div className="App">
      {/* Render Login Form */}
      {/* <LoginForm /> */}
      {/* <RegisterForm /> */}
      <Router>
        <nav>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/login'>Login</Link>
            </li>
            <li>
              <Link to='/register'>Register</Link>
            </li>
            <li>
              <Link to='/katas'>Katas</Link>
            </li>
          </ul>
        </nav>
        {/* TODO: Export to Routes Folder */}
        <Routes>
          {/* Routes definition */}
          <Route path='/' element={<HomePage />}></Route>
          <Route path='/login' element={<LoginPage />}></Route>
          <Route path='/register' element={<RegisterPage />}></Route>
          <Route path='/katas' element={<KatasPage />}></Route>
          <Route path='/katas/:id' element={<KatasDetailPage />}></Route>
          {/* Redirecto when Page Not Found */}
          <Route 
            path='*' 
            element={<Navigate to='/' replace />}>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
```

en pages/KatasPages.tsx

```typescript
import React from "react";

import { useNavigate } from "react-router-dom";

export const KatasPage = () => {

    let navigate = useNavigate();

    /**
     * Method to navigate to Kata Details
     * @param id 
     */
    const navigateToKataDetail = (id: number) => {

        navigate(`/katas/${id}`)
    }
    return (
        <div>
            <h1>
               Katas Page
            </h1>
            {/*  TODO: Real Katas */}
            <ul>
                <li onClick={ () => navigateToKataDetail(1)}>
                    First Kata
                </li>
                <li onClick={ () => navigateToKataDetail(2)}>
                    Second Kata
                </li>
            </ul>
        </div>
    )
}
```

y en katasDetailPage
```typescript
import React from "react";

// React Router Dom Imports
import { useNavigate, useParams } from "react-router-dom";

export const KatasDetailPage = () => {

    // Find id form params
    let { id } = useParams();

    // Variable to navigate between stack of routes
    let navigate = useNavigate();


    
    return (
        <div>
            <h1>
                Katas Detail Page: { id }
            </h1>
        </div>
    )
}
```


## Lo anterior nos permite navegar de uno a otro

ahora creamos el directorio hooks con el archivo useSessionStorage.ts

```typescript
export const useSessionStorage =   (key: string): any | boolean => {

    // Comprobando si tengo token guardado en sessionStorage
    const storedValue = sessionStorage.getItem(key);

    if(!storedValue){
        return false;
    }else {
        return storedValue;
    }
}
```


y ahora para redirigir siempre que no estemos logeados aplicar la logica siguiente en cada page

```typescript

  let loggedIn = useSessionStorage('sessionJWTToken');
    let navigate = useNavigate();


    useEffect(() => {
        if(!loggedIn){
            return navigate('/login');
        }
    }, [loggedIn]) // cada vez que cambie el valor se vuelve a ejecutar

```

## ahora creamos una especie de textbox para que los usuarios puedan escribir código en la web
para ello debemos instalar

```sql
npm i prism-react-renderer
```



