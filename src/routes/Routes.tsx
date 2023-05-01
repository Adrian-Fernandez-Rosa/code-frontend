// React Router DOM Imports
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { KatasPage } from '../pages/KatasPages';
import { KatasDetailPage } from '../pages/KatasDetailPage';

export const AppRoutes = () => {
    return (
        <><nav>
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
            </Routes></>

        
        )
}