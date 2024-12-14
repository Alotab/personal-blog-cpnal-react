import { createContext, useEffect, useState } from "react";
// import { useLocation, useNavigate } from 'react-router-dom'

const AuthContext = createContext(null);
import axios from "../app/axios";

const LOGIN_URL = '/jwt/create/';
const USER_INFO_URL ='/users/me';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [accessToken, setAccessToken] = useState('');
    const [refreshToken, setRefreshToken] = useState('');
    const [email, setEmail] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [username, setUsername] = useState(null);
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
            // localStorage.setItem('access_token')
            const accessToken = response?.data?.access;
            const refreshToken = response?.data?.refresh;
          


            // Use access token to fetch the user info
            const userResponse = await axios.get(USER_INFO_URL,{
                headers: { 'Authorization': `JWT ${accessToken}`}
            });

            const userData = await userResponse.data;
            setUsername(userData.username);
            console.log('AuthProvide Info:', userData.username);
            console.log('logger username: ', username);

            if (userData) {
                setUser({
                    username: userData.username,
                    email: userData.email,
                    id: userData.id
                });
                
                // setEmail(res.email);
                setRefreshToken(refreshToken);
                setAccessToken(accessToken);
                return;
            }
            throw new Error(res.message);
        } catch(err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            console.error("Error details:", err);
        }


    };

    const logOut = () => {
        setUser(null);
        setAccessToken('');
        setRefreshToken('');
        navigate('/');
    };




    return (
        <AuthContext.Provider value={{ username, setUsername, loginAction }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;