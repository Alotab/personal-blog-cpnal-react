import axios from 'axios';
import React, { useEffect, useState } from 'react'
import api from '../tokenRefresh';
import { useApiContext } from '../context/ApiProvider';
import toast from 'react-hot-toast';


const Register = () => {
    const { errMsg, setErrMsg } = useApiContext();
    const [csrfToken, setCsrfToken] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    


    useEffect(() => {
        const fetchCsrfToken = async () => {
            const response = await axios.get('http://127.0.0.1:8000/get-csrf-token/');
            setCsrfToken(response.data.csrfToken)
        };
        fetchCsrfToken();
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const userData = new FormData()
        userData.append('username', username);
        userData.append('password', password)
        userData.append('email', email);
       
 

        try {
            const response = await api.post('/auth/users/', userData, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken
                }
            });
            if (response.status === 200) {
                setUsername('');
                setEmail('');
                setPassword('');
                toast.success('You have successfully created an account. Please log in.');
            };
            
        } catch (error) {
            if (!err?.response) {
                // No response from server
                setErrMsg('No Server Response');
            } else {
                // Handle specific errors based on status code
                switch (err.response.status) {
                    case 400:
                        setErrMsg('Missing required fields or invalid input format');
                        break;
                    case 401:
                        setErrMsg('You are already logged in. Please log out before registering a new account');
                        break;
                    case 409:
                        setErrMsg('Username or email is already taken');
                        break;
                    case 422:
                        setErrMsg('Please check your input. Make sure your password is strong and all fields are valid');
                        break;
                    case 429:
                        setErrMsg('Too many registration attempts, please try again later');
                        break;
                    case 500:
                        setErrMsg('Server error. Please try again later');
                        break;
                    case 503:
                        setErrMsg('Service temporarily unavailable, try again later');
                        break;
                    default:
                        setErrMsg('An unknown error occurred');
                }
            }
        } ;
    };

  return (

    <div className="signup-wrapper">
        <div className='centers'>
            <h1>Register</h1>
            {errMsg && (
                <p>❌ {}</p>
            )}
            <form action="" onSubmit={handleSubmit}>
                <div className="txt_field">
                    <span></span>
                    <input value={username} onChange={(e) => setUsername(e.target.value)} type='text'  required/>
                    <label htmlFor="">Username</label>
                </div>
            
                <div className="txt_field">
                    <span></span>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required/>
                    <label htmlFor="">Email</label>
                </div>
                <div className="txt_field">
                    <span></span>
                    <input value={password} onChange={(e) => { setPassword(e.target.value) }} type="password" required/>
                    <label htmlFor="">Password</label>
                </div>
                <div className="pass">Forgot Password?</div>
                <input type="submit" />
                <div className="signup_link">
                    Already a member? <a href={"login"}>Signin</a>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Register