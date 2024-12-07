import axios from 'axios';
import React, { useEffect, useState } from 'react'
import api from '../tokenRefresh';


const Register = () => {
    const [csrfToken, setCsrfToken] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    


    useEffect(() => {
        const fetchCsrfToken = async () => {
            const response = await axios.get('http://127.0.0.1:8000/get-csrf-token/');
            setCsrfToken(response.data.csrfToken)
            console.log('csrf token success')
        };
        fetchCsrfToken();
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const userData = new FormData()
        userData.append('username', username);
        userData.append('email', email);
        userData.append('password', password)
        userData.append('firstName', firstName)
        userData.append('lastName', lastName)

        console.log('firstName', firstName);
        console.log('lastName', lastName)


        // const userData = {
        //     username,
        //     email,
        //     password
        // };
        console.log('Data:', userData)

        try {
            const response = await api.post('/auth/users/', userData, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken
                }
            })
            console.log('Registration successful:', response.data)

        } catch (error) {
            console.error('Error registering:', error);
        }

        
    }

  return (
    <>
        <form action="" onSubmit={handleSubmit}>
            <input 
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)} 
                placeholder='Username'
            />

            <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
                placeholder='Email'
            />

            <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
                placeholder='Passowrd'
            />

            <input 
                type='text'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)} 
                placeholder='First Name'
            />

            <input 
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)} 
                placeholder='Last Name'
            />

            <button type="submit" disabled={!username || !email ||!password}>
                Register
            </button>
        </form>
    </>
  )
}

export default Register