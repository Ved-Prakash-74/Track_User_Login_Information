import { createContext } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import { AllRouting } from '../src/AllRouting';
import './App.css';
import Navbar from './Components/Navbar';
import { AuthProvider } from './Components/AuthContext';

function App() {

  return (
    <div>
      <AuthProvider>
        <Router>
          <Navbar />
          <AllRouting />
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
