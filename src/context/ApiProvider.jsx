import { createContext, useContext, useEffect, useId, useState } from "react";
// import { useLocation, useNavigate } from 'react-router-dom'

const ApiContext = createContext(null);
import axios from "../app/axios";
import { useLocation, useNavigate } from "react-router-dom";
import { PropagateLoader } from "react-spinners";

const LOGIN_URL = '/jwt/create/';
const USER_INFO_URL ='/users/me';

export const ApiProviders = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [user, setUser] = useState(false);
    const [accessToken, setAccessToken] = useState('');
    const [refreshToken, setRefreshToken] = useState('');
    // const [email, setEmail] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [userName, setUserName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userID, setUserID] = useState('');
    

    const loginAction = async (username, password, navigate, from) => {
        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ username, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            const access_token = response?.data?.access;
            const refresh_token = response?.data?.refresh;
            localStorage.setItem('access_token', access_token);
            localStorage.setItem('refresh_token', refresh_token);
            setAccessToken(access_token);
            setRefreshToken(refresh_token);
          

            // Use access token to fetch the user info
            const userResponse = await axios.get(USER_INFO_URL,{
                headers: { 'Authorization': `JWT ${access_token}`}
            })
            const userData = userResponse?.data;
            console.log(userData);
            const userEmail = userData?.email;
            const userName = userData?.username;
            const firstName = userData?.first_name;
            const lastName  = userData?.last_name;
            const userId = userData?.id;
            // console.log('User ID', userId);
            localStorage.setItem('username', userName);
            localStorage.setItem('first_name', firstName);
            localStorage.setItem('last_name', lastName);
            localStorage.setItem('user_id', userId);
            localStorage.setItem('auth', userData);
            setAuth(userData);
            setUser(true);
            setUserID(userId);
            setFirstName(firstName);
            setLastName(lastName);
            setUserName(userName); 
        

            if (response?.status === 200 || response?.status === 201) {
                navigate(from, { replace: true });
            }
       
         
              
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400 || err.response?.status === 401) {
                setErrMsg('Invalid Username or Password');;
            } else {
                setErrMsg('Login Failed');
            }
            console.error("Error details:", err);
        }
    }

    const logOut = (navigate, from) => {
        setUser(false);
        setUserName(null);
        setAccessToken('');
        setRefreshToken('');
        localStorage.clear();
        navigate(from, { replace: true });
    };
  
    useEffect(() => {
        const storedAuth = localStorage.getItem('auth');
        const storedAccessToken = localStorage.getItem('access_token');
        const storedRefreshToken = localStorage.getItem('refresh_token');
        const storedUsername = localStorage.getItem('username');
        const storedFirstName = localStorage.getItem('first_name');
        const storedLastName = localStorage.getItem('last_name');
        const storedUserID = localStorage.getItem('user_id');

        if (storedAuth) {
            setAuth(storedAuth);
        }
        
        if (storedAccessToken) {
            setAccessToken(storedAccessToken);
            setUser(true);
        }

        if (storedRefreshToken) {
            setRefreshToken(storedRefreshToken);
        }

        if(storedUsername) {
            setUserName(storedUsername);
            setUser(true);
        }

        if (storedFirstName) {
            setFirstName(storedFirstName);
        }

        if (storedLastName) {
            setLastName(storedLastName);
        }
        if (storedUserID) {
            setUserID(storedUserID);
        }

    }, []);


    return (
        <ApiContext.Provider value={{
            auth,
            setAuth,
            refreshToken, 
            accessToken, 
            loginAction, 
            userName, 
            setErrMsg, 
            errMsg, 
            setUserName, 
            setAccessToken, 
            setRefreshToken, 
            logOut,
            firstName,
            lastName,
            userID,
            user
        }}>
            {children}
        </ApiContext.Provider>
    );
};


export default ApiContext;
export const useApiContext = () => useContext(ApiContext);




































// import React, { createContext, useState, useContext } from 'react'


// const ApiContext = createContext(null);

// export const ApiProvider = ({ children }) => {
//     const [accessToken, setAccessToken] = useState('');
//     const [apiData, setApiData] = useState(null);


//     const LoginAction = async (username, password) => {
//         try {
//             const response = await axios.post(LOGIN_URL,
//                 JSON.stringify({ username, password }),
//                 {
//                     headers: { 'Content-Type': 'application/json' },
//                     withCredentials: true
//                 }
//             );

//             const accessToken = response.data.access;
//             setAccessToken(accessToken);
//         } catch (err) {
//             if (!err?.response) {
//                 setErrMsg('No Server Response');
//             } else if (err.response?.status === 400) {
//                 setErrMsg('Missing Username or Password');
//             } else if (err.response?.status === 401) {
//                 setErrMsg('Unauthorized');
//             } else {
//                 setErrMsg('Login Failed');
//             }
//             console.error("Error details:", err)
//         };
//     };
    

//     return (
//         <ApiContext.Provider value={{LoginAction}}>
//             {children}
//         </ApiContext.Provider>
//     );
// };


// export default ApiContext;

// // // Custom hook to use context
// // export const useApiContext = () => useContext(ApiContext);