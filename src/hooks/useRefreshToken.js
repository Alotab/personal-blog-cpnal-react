import axios from 'axios';
import ApiContext, { useApiContext } from '../context/ApiProvider';
// import useAuth from './useAuths';


const useRefreshToken = () => {
    const { setAccessToken } = useApiContext();

    const refresh = async () => {
        const response = await axios.get('http://127.0.0.1:8000/auth/jwt/refresh/', {
            withCredentials: true
        });
        setAccessToken(prev => {
            console.log(JSON.stringify(prev));
            console.log(response.data.access);
            return { ...prev, setAccessToken: response.data.access}
        });
        setAccessToken(response.data.access);
        return response.data.access

    }
    return refresh;

};

export default useRefreshToken;



// import axios from 'axios';
// import useAuth from './useAuths';


// const useRefreshToken = () => {
//     const { setAccessToken } = useAuth();

//     const refresh = async () => {
//         const response = await axios.get('/jwt/refresh/', {
//             withCredentials: true
//         });
//         setAuth(prev => {
//             console.log(JSON.stringify(prev));
//             console.log(response.data.access);
//             return { ...prev, accessToken: response.data.access}
//         });
//         setAccessToken(response.data.access);
//         return response.data.access

//     }
//     return refresh;

// };

// export default useRefreshToken;