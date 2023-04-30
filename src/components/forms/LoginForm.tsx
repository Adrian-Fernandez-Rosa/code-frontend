import React from 'react';

import { useNavigate } from "react-router-dom";
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

    let navigate = useNavigate();

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

                    login(values.email, values.password).then(async (response: AxiosResponse) => { //import authservice

                        if(response.status === 200){
                            if(response.data.token){
                               console.table(response.data);
                               await sessionStorage.setItem('sessionJWTToken', response.data.token);
                               navigate('/');
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