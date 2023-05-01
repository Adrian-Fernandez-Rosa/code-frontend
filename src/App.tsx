import React from 'react';
import './App.css';

// React Router DOM Imports
import { BrowserRouter as Router } from 'react-router-dom';

import { AppRoutes } from './routes/Routes';

// import LoginForm from './components/forms/LoginForm';
// import RegisterForm from './components/forms/RegisterForm';

function App() {
  return (
    <div className="App">

      <Router>       
        <AppRoutes />
      </Router>
    </div>
  );
}

export default App;
