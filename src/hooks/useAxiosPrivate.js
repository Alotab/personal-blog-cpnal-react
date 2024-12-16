

import React, { useEffect } from 'react'
import useRefreshToken from './useRefreshToken'
// import useAuth from './useAuth';
import { axiosPrivate } from '../app/axios';
import { useApiContext } from '../context/ApiProvider';



const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    // const { auth } = useAuth();
    const { accessToken } = useApiContext();

    console.log('access_token:', accessToken);

    useEffect(() => {

        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    console.log('Adding Authorization header to request:', accessToken); // Debugging log
                    config.headers['Authorization'] = `JWT ${accessToken}`;
                } else {
                    console.log('Authorization header already present:', config.headers['Authorization']); // Debugging log
                }   
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    console.log('Received 403 error, attempting token refresh...'); // Debugging log

                    const newAccessToken = await refresh();
                    console.log('New access token received:', newAccessToken); // Debugging log

                    prevRequest.headers['Authorization'] = `JWT ${newAccessToken}`;
                    return axiosPrivate(prevRequest);
                }
                // If the error is not a 403, reject it normally
                console.log('Request failed with status:', error?.response?.status); // Debugging log
                return Promise.reject(error);
            }
        );
        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [accessToken, refresh])


  return axiosPrivate;
}

export default useAxiosPrivate;