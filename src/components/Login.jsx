
import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useApiContext } from '../context/ApiProvider';


const Login = () => {
    const { loginAction, errMsg } = useApiContext();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
 
    const [usernames, setUsernames] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        loginAction(usernames, password, navigate, from);
    };

   
    
  return (
    <div className='wrapper' style={{marginTop : '150px', padding : '20px'}}>
        {errMsg && <p style={{ color: 'red' }}>{errMsg}</p>}
        <form action="" onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input 
                type="text"
                value={usernames}
                autoComplete='off'
                onChange={(e) => setUsernames(e.target.value)}
                placeholder='Username'
                required
            />

            <label htmlFor="password">Password:</label>
            <input 
                type="text" 
                value={password}
                autoComplete='off'
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Password'
                required
            />

            <button type="submit" disabled={!usernames || !password}>
                Login
            </button>       
        </form>
    </div>
  );
};

export default Login;


// http://127.0.0.1:8000/auth/jwt/create/  








 // const handleSubmit =async (e) => {
    //     e.preventDefault()

    //     const loginData = new FormData()
    //     loginData.append('username', username);
    //     loginData.append('password', password);

      
    //     try {
    //         await api.post(
    //             '/auth/jwt/create/', loginData
    //         ).then(response => {
    //             localStorage.setItem('access_token', response.data.access);
    //             localStorage.setItem('refresh_token', response.data.refresh);

    //             // Call the onLoginSuccess callback to fetch user data
    //             // onLoginSuccess(response.data.access);

    //             console.log('access_token', response.data.access);
    //             // console.log('refresh_token', response.data.refresh);
    //         })

    //     } catch (error) {
    //         setError('Something went wrong');
    //         console.error('Failed to Login:', error)
    //     }
    // }

    ///// Use useEffect to track auth changes and log the updated state
    // useEffect(() => {
    //     console.log('Updated auth:', auth.username);
    // }, [auth]); // This will log whenever `auth` state changes
