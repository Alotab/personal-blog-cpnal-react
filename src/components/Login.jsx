
import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useApiContext } from '../context/ApiProvider';

import { PropagateLoader } from 'react-spinners';

const override ={
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

const Login = () => {
    const {logOut, loginAction, errMsg, setErrMsg } = useApiContext();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
 
    const [usernames, setUsernames] = useState('');
    const [password, setPassword] = useState('');
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const [isRegistration, setIsRegistration] = useState(false)

    let [loading, setLoading] = useState(false);
    let [color, setColor] = useState("#654ee6");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsAuthenticating(true);
        loginAction(usernames, password, navigate, from);

        if (isRegistration) {
            setLoading(true);

            // setTimeout(() => {
            //     try {
            //         loginAction(usernames, password, navigate, from);
    
            //     } catch(err){
            //         setErrMsg('Invadlid Credentials');
            //     } finally {
            //         setLoading(false);
            //     }
            // }, 3000);
        }else {
            await logOut(navigate, from);
        }
     

    };

   
    
  return (
    // <div className='wrapper' style={{marginTop : '150px', padding : '20px'}}>
    //     {errMsg && <p style={{ color: 'red' }}>{errMsg}</p>}

    //     {loading ? 
    //        (<PropagateLoader 
    //            color={color}
    //            loading={loading}
    //            cssOverride={override}
    //            size={150}
    //            aria-label="Loading Spinner"
    //            data-testid="loader"
    //        />)
    //        :
    //         (
    //             <form action="" onSubmit={handleSubmit}>
    //                 <label htmlFor="username">Username:</label>
    //                 <input 
    //                     type="text"
    //                     value={usernames}
    //                     autoComplete='off'
    //                     onChange={(e) => setUsernames(e.target.value)}
    //                     placeholder='Username'
    //                     required
    //                 />
        
    //                 <label htmlFor="password">Password:</label>
    //                 <input 
    //                     type="text" 
    //                     value={password}
    //                     autoComplete='off'
    //                     onChange={(e) => setPassword(e.target.value)}
    //                     placeholder='Password'
    //                     required
    //                 />
        
    //                 <button type="submit" disabled={!usernames || !password}>
    //                     Login
    //                 </button>       
    //             </form>
    //         )

    //     }

      
    // </div>


    <div className='signup-wrapper'>
        <h2 className="sign-up-text" style={{marginTop : '150px', padding : '20px'}}>{isRegistration ? 'Sign Up' : 'Login'}</h2>
        <p>{isRegistration ? 'Create an account!' : 'Sign in to your account!'}</p>
        {errMsg && (
            <p>❌ {}</p>
        )}
        <form action="" onSubmit={handleSubmit}>
            <input value={usernames} onChange={(e) => { setUsernames(e.target.value) }} placeholder="Username" />
            <input value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder="********" type="password" />
            <button ><p>{isAuthenticating ? 'Authenticating...' : 'Submit'}</p></button>

        </form>
        {/* <input value={usernames} onChange={(e) => { setUsernames(e.target.value) }} placeholder="Username" />
        <input value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder="********" type="password" />
        <button onClick={handleSubmit}><p>{isAuthenticating ? 'Authenticating...' : 'Submit'}</p></button> */}
        {/* <hr /> */}
        <div className="register-content" style={{marginTop : '10px'}}>
            <p>{isRegistration ? 'Already have an account?' : 'Don\'t have an account?'}</p>
            <button onClick={() => { setIsRegistration(!isRegistration) }}><p>{isRegistration ? 'Sign in' : 'Sign up'}</p></button>
        </div>
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
