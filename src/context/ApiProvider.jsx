import { createContext, useContext, useEffect, useState } from "react";
// import { useLocation, useNavigate } from 'react-router-dom'

const ApiContext = createContext(null);
import axios from "../app/axios";
import { useLocation, useNavigate } from "react-router-dom";


const LOGIN_URL = '/jwt/create/';
const USER_INFO_URL ='/users/me';

export const ApiProviders = ({ children }) => {
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState('');
    const [refreshToken, setRefreshToken] = useState('');
    const [email, setEmail] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [userName, setUserName] = useState('');
    // const navigate = useNavigate();
    // const location = useLocation();
    // const from = location.state?.from?.pathname || "/";

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
            const userEmail = userResponse?.data?.email;
            const userName = userResponse?.data?.username;
            localStorage.setItem('username', userName);
            setUser(userEmail);
            setUserName(userName); 
            navigate(from, { replace: true });  
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


  
    useEffect(() => {
        const storedAccessToken = localStorage.getItem('access_token');
        const storedRefreshToken = localStorage.getItem('refresh_token');
        const storedUsername = localStorage.getItem('username');
        if (storedAccessToken) {
            setAccessToken(storedAccessToken);
        }

        if (storedRefreshToken) {
            setRefreshToken(storedRefreshToken);
        }

        if(storedUsername) {
            setUserName(storedUsername);
        }

    }, []);


    return (
        <ApiContext.Provider value={{refreshToken, accessToken, loginAction, userName, errMsg }}>
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