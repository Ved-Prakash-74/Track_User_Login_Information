import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import emailSymbol from '../Assests/envelope-solid.svg';
import passwordSymbol from '../Assests/lock-solid.svg';
import { useAuth } from '../Components/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [ipAddress, setIpAddress] = useState('');


  useEffect(() => {
    const fetchIpAddress = async () => {
      try {
        const response = await axios.get('https://api.ipify.org?format=json');
        setIpAddress(response.data.ip);
      } catch (error) {
        console.error('Error fetching IP address:', error);
        setIpAddress('Error fetching IP');
      }
    };

    fetchIpAddress();
  }, []);

  const navigate = useNavigate();
  const { login } = useAuth();

  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      axios.post('http://localhost:5000/Login', { email, password, ipAddress })
        .then((result) => {
          console.log(result);
          if (result.data.Status === 'Success') {
            localStorage.setItem('email-logged-in', email)
            login();
            navigate('/');
          } else if (result.data.Status === 'The password is incorrect') {
            alert('Password is Incorrect');
          } else if (email === '' || password === '') {
            alert('Please enter the credentials');
          } else {
            alert('Please register first');
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="container-main-1">
      <div className="container-main-2">
        <form onSubmit={handleSubmit}>
          <h1>LOG IN</h1>
          <div>
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <img className="img-1" src={emailSymbol} alt="" />
            <input type="email" placeholder="Enter Email" name="email" className="input-1" onChange={(e) => setEmail(e.target.value)} />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div>
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <img className="img-2" src={passwordSymbol} alt="" />
            <input type="password" placeholder="Enter Password" name="password" className="input-2" onChange={(e) => setPassword(e.target.value)} />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>
          <button type="submit" className="btn-login">
            <strong>Login</strong>
          </button>

          <p className="para">Haven't registered yet. Create Account</p>
          <Link to="/SignUp">
            <button type="button" className="btn-create">
              <strong>Create Account</strong>
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
