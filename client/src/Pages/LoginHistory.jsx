import React, { useState } from 'react';
import axios from 'axios';
import './LoginHistory.css'
import { useAuth } from '../Components/AuthContext';

const LoginHistory = () => {
  const [email, setEmail] = useState('');
  const [loginHistory, setLoginHistory] = useState([]);
  const [status, setStatus] = useState('');
  const { isLoggedIn  } = useAuth();
  const logged_in_mail = localStorage.getItem('email-logged-in')

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setLoginHistory([]);
    setStatus('')
  }

  const handleFetchLoginHistory = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/LoginHistory/${email}`);

      if (response.status === 200) {
        setLoginHistory(response.data.LoginHistory);
        setStatus('Login history retrieved successfully.');
      }
    } catch (error) {
      console.error('Error fetching login history:', error);
      setStatus('Error fetching login history.');
    }
  };

  const handlealert = () => {
    setStatus('Error fetching login history.');
    alert("You can't view others history")
    alert("Login using your credentials");
  }

  return (
    <div className='main-container-1'>
      <h1>Login History</h1>
      <div className='main-container-2'>
        <label className='label-1'>Email</label>
        <input className='input-1' type="email" value={email} onChange={handleEmailChange} />
        {
          isLoggedIn && email === logged_in_mail ?

            <button className='btn-1' onClick={handleFetchLoginHistory}>Fetch Login History</button>
            :
            <button className='btn-1' onClick={handlealert}>Fetch Login History</button>
        }
      </div>
      <p className={status === 'Login history retrieved successfully.' ? 'success-message' : 'error-message'}>
        {status}
      </p>
      {loginHistory.length > 0 && (
        <div className='output-container'>
          <table>
            <thead>
              <tr>
                <th className='output-1'>IP Address</th>
                <th className='output-2'>Login Time</th>
              </tr>
            </thead>
            <tbody>
              {loginHistory.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.ipAddress}</td>
                  <td>{new Date(entry.loginTime).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      )}
    </div>
  );
};

export default LoginHistory;

