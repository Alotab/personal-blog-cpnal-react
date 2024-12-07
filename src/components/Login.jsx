import React, { useState } from 'react'






const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')



    const handleSubmit = () => {

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

            <button type="submit" disabled={!username || !email ||!password}>
                Login
            </button>       


        </form>


    </div>
  )
}

export default Login


// http://127.0.0.1:8000/auth/jwt/create/  