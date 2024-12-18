
import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useApiContext } from '../context/ApiProvider';
import { PropagateLoader } from 'react-spinners';



// const override ={
//     display: "block",
//     margin: "0 auto",
//     borderColor: "red",
//   };

const Login = () => {
    const { loginAction, errMsg, setErrMsg } = useApiContext();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
 
    const [usernames, setUsernames] = useState('');
    const [password, setPassword] = useState('');
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const [isRegistration, setIsRegistration] = useState(false)

    // let [loading, setLoading] = useState(false);
    // let [color, setColor] = useState("#654ee6");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsAuthenticating(true);

        try {
            loginAction(usernames, password, navigate, from);
        } catch (error) {
            console.log(errMsg);
        }
        

        
        // }else {
        //     await logOut(navigate, from);
        // }
    };

   
    
  return ( 
    <div className="signin-wrapper">
        <div className='centers'>
            <h1>Login</h1>
            {/* <h2 className="sign-up-text" >{isRegistration ? 'Sign Up' : 'Login'}</h2> */}
            {/* <p>{isRegistration ? 'Create an account!' : 'Sign in to your account!'}</p> */}
            {errMsg && (
                <p>❌ {errMsg}</p>
            )}
            <form action="" onSubmit={handleSubmit}>
                <div className="txt_field">
                    <span></span>
                    <input value={usernames} onChange={(e) => { setUsernames(e.target.value) }}  required/>
                    <label htmlFor="">Username</label>
                </div>
            
                <div className="txt_field">
                    <span></span>
                    <input value={password} onChange={(e) => { setPassword(e.target.value) }} type="password" required/>
                    <label htmlFor="">Password</label>
                </div>
                <div className="pass">Forgot Password?</div>
                <input type="submit" value="Submit" />
                
                {/* <button ><p>{isAuthenticating ? 'Authenticating...' : 'Submit'}</p></button> */}
                <div className="signup_link">
                    Not a member? <Link to={"/register"}>Signup</Link>
                </div>
            </form>
       

            {/* <div className="register-content" style={{marginTop : '10px'}}>
                <p>{isRegistration ? 'Already have an account?' : 'Don\'t have an account?'}</p>
                <button onClick={() => { setIsRegistration(!isRegistration) }}><p>{isRegistration ? 'Sign in' : 'Sign up'}</p></button>
            </div> */}
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
