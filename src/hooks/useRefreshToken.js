import axios from 'axios';
import useAuth from './useAuths';


const useRefreshToken = () => {
    const { setAccessToken } = useAuth();

    const refresh = async () => {
        const response = await axios.get('/jwt/refresh/', {
            withCredentials: true
        });
        // setAuth(prev => {
        //     console.log(JSON.stringify(prev));
        //     console.log(response.data.access);
        //     return { ...prev, accessToken: response.data.access}
        // });
        setAccessToken(response.data.access);
        return response.data.access

    }
    return refresh;

};

export default useRefreshToken;