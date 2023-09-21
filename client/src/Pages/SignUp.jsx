import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignUp.css';
import emailSymbol from '../Assests/envelope-solid.svg';
import passwordSymbol from '../Assests/lock-solid.svg';
import userSymbol from '../Assests/user-solid.svg';

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        let isValid = true;

        if (!name.trim()) {
            setNameError('Username is required');
            isValid = false;
        }
        else {
            setNameError('');
        }

        if (!email.trim()) {
            setEmailError('Email is required');
            isValid = false;
        }
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setEmailError('Invalid email format');
            isValid = false;
        }
        else {
            setEmailError('');
        }

        if (!password.trim()) {
            setPasswordError('Password is required');
            isValid = false;
        }
        else if (password.length < 6) {
            setPasswordError('Password must be at least 6 characters');
            isValid = false;
        }
        else {
            setPasswordError('');
        }

        if (isValid) {
            axios.post('http://localhost:5000/TrackUserInformation', { name, email, password })
                .then((result) => {
                    if (result.data.Status === "Email already exists") {
                        alert("Email already exists")
                    }
                    else {
                        navigate('/Login');
                    }
                })
                .catch((err) => console.log(err));
        }
    };

    return (
        <div className="container-main-1">
            <div className="container-main-2">
                <form onSubmit={handleSubmit}>
                    <h1>Sign Up</h1>

                    <div>
                        <label htmlFor="name">
                            <strong>Username</strong>
                        </label>
                        <img className="img-1" src={userSymbol} style={{ width: '15px' }} alt="" />
                        <input type="text" placeholder="Enter Username" name="name" className="input-1" onChange={(e) => setName(e.target.value)} />
                        <span className="error">{nameError}</span>
                    </div>

                    <div>
                        <label htmlFor="email">
                            <strong>Email</strong>
                        </label>
                        <img className="img-2" src={emailSymbol} style={{ width: '15px' }} alt="" />
                        <input type="email" placeholder="Enter Email" name="email" className="input-2" onChange={(e) => setEmail(e.target.value)} />
                        <span className="error">{emailError}</span>
                    </div>

                    <div>
                        <label htmlFor="password">
                            <strong>Password</strong>
                        </label>
                        <img className="img-3" src={passwordSymbol} style={{ width: '15px' }} alt="" />
                        <input type="password" placeholder="Enter Password" name="password" className="input-3" onChange={(e) => setPassword(e.target.value)} />
                        <span className="error">{passwordError}</span>
                    </div>

                    <button type="submit" className="btn-signup">
                        <strong>Sign Up</strong>
                    </button>

                    <Link to="/Login">
                        <button type="button" className="btn-login">
                            <strong>Log in</strong>
                        </button>
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
