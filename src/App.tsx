import React from 'react';
import './App.css';

// React Router DOM Imports
import { BrowserRouter as Router } from 'react-router-dom';

import { AppRoutes } from './routes/Routes';
import { Copyright } from './components/dashboard/CopyRight';
import { StickyFooter } from './components/dashboard/StickyFooter';

// import LoginForm from './components/forms/LoginForm';
// import RegisterForm from './components/forms/RegisterForm';

function App() {
  return (
    <div className="App">

      <Router>       
        <AppRoutes />
      </Router>
      <StickyFooter />
    </div>
  );
}

export default App;
