import axios from 'axios'
import React, { useState } from 'react'
import api from '../tokenRefresh'




const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')



    const handleSubmit =async (e) => {
        e.preventDefault()

        const loginData = new FormData()
        loginData.append('username', username);
        loginData.append('password', password);

      

        try {
            await api.post(
                '/auth/jwt/create/', loginData
            ).then(response => {
                localStorage.setItem('access_token', response.data.access);
                localStorage.setItem('refresh_token', response.data.refresh);
                
                console.log('access_token', response.data.access);
                console.log('refresh_token', response.data.refresh);
            })

        } catch (error) {
            console.error('Failed to Login:', error)
        }


    }

  return (
    <div>
        <form action="" onSubmit={handleSubmit}>
            <input 
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder='Username'
            />

            <input 
                type="text" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Password'
            />

            <button type="submit" disabled={!username || !password}>
                Login
            </button>       
        </form>
    </div>
  )
}

export default Login


// http://127.0.0.1:8000/auth/jwt/create/  