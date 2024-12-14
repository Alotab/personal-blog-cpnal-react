import { useContext, useEffect, useState } from 'react';
import { useApiContext } from '../context/ApiProvider';



const Profile = () => {
    const { firstName, lastName, userName, userID } = useApiContext();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    

    // console.log('Have accestoken in Profile:', accessToken);

    // useEffect(() => {
    //     console.log('Updated PROFILE auth:', username);  // Log the updated auth state
    // }, [username]); 

    // Loading or error handling
    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>{error}</p>;

    return (
        <div style={{ marginTop: '150px', padding: '20px' }}>
            {userName ? 
                <> 
                <h1>Welcome, {userName}</h1>
                <h2>FirstName: {firstName}!</h2>
                <p>User ID: {userID}</p>
                </>
            : 
                <>
                    <h1>Hello, and welcome to this page</h1>
                </>
            }
        </div>
    );
};

export default Profile;






  // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             // Use the API instance to make the request
    //             const response = await api.get('/auth/users/me/');
                
    //             // Axios automatically parses the response data as JSON, so no need for .json()
    //             setUser(response.data);  // Assuming the response has a 'data' field
    //             setLoading(false);  // Set loading to false once the data is fetched
    //         } catch (err) {
    //             console.log('Error fetching user data:', err);  // Log the actual error
    //             setError('Failed to load user data');
    //             setLoading(false);  // Set loading to false if there's an error
    //         }
    //     };
        
    //     fetchData();
    // }, []);








// // Helper function to fetch a new access token using refresh token
// const refreshAccessToken = async (refreshToken) => {
//     const response = await fetch('http://localhost:8000/auth/jwt/refresh/', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ refresh: refreshToken }),
//     });
//     if (response.ok) {
//         const data = await response.json();
//         localStorage.setItem('access_token', data.access);
//         return data.access;
//     }
//     return null;
// };

// const Profile = () => {
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
    
//     useEffect(() => {
//         const fetchUserData = async () => {
//             let token = localStorage.getItem('access_token');
//             const refreshToken = localStorage.getItem('refresh_token');
            
//             if (!token) {
//                 setError('No access token found');
//                 setLoading(false);
//                 return;
//             }
            
//             try {
//                 // const response = await fetch('http://localhost:8000/auth/users/me/', {
//                 //     method: 'GET',
//                 //     headers: {
//                 //         'Content-Type': 'application/json',
//                 //         Authorization: `JWT ${token}`,
//                 //     },
//                 // });
//                 await api.get(
//                     '/auth/users/me/'
//                 ).then(response => {
//                     const data = response.json();
//                     setUser(data)
//                 })

//                 // if (!response.ok && response.status === 401 && refreshToken) {
//                 //     // If the token is expired, attempt to refresh it
//                 //     const newToken = await refreshAccessToken(refreshToken);
//                 //     if (newToken) {
//                 //         // Retry fetching user data with the new token
//                 //         const retryResponse = await fetch('http://localhost:8000/auth/users/me/', {
//                 //             method: 'GET',
//                 //             headers: {
//                 //                 'Content-Type': 'application/json',
//                 //                 Authorization: `JWT ${newToken}`,
//                 //             },
//                 //         });
//                 //         const data = await retryResponse.json();
//                 //         setUser(data);
//                 //     } else {
//                 //         setError('Token refresh failed');
//                 //     }
//                 // } else if (response.ok) {
//                 //     const data = await response.json();
//                 //     setUser(data);
//                 // } else {
//                 //     setError('Failed to fetch user data');
//                 // }
//                 // setLoading(false);
//             } catch (err) {
//                 setError(err.message);
//                 setLoading(false);
//             }
//         };

//         fetchUserData();
//     }, []);  

//     if (loading) return <p>loading...</p>;
//     if (error) return <p>{error}</p>;

//     return (
//         <div style={{ marginTop: '150px', padding: '20px' }}>
//             <h2>Welcome, {user.username}!</h2>
//             <p>Email: {user.email}</p>
//         </div>
//     );
// };

// export default Profile;


















// import React, { useEffect, useState } from 'react';

// const Profile = () => {
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         const fetchUserData = async () => {
//             const token = localStorage.getItem('access_token');

//             try {
//                 const response = await fetch('http://localhost:8000/auth/users/me/', {
//                     method: 'GET',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         Authorization: `JWT ${token}`,
//                     },
//                 });

//                 if (!response.ok) {
//                     throw new Error('Network response was not ok')
//                 }

//                 const data = await response.json();
//                 setUser(data);
//                 setLoading(false);
//             } catch (err) {
//                 setError(err.message);  // Fixed typo: `err.messsage` -> `err.message`
//                 setLoading(false);
//             }
//         };

//         fetchUserData();
//     }, []);  // Add the empty dependency array to ensure this effect runs only once

//     if (loading) return <p>loading...</p>;
//     if (error) return <p>{error}</p>;

//     return (
//         <div style={{ marginTop: '150px', padding: '20px' }}>
//             <h2>Welcome, {user.username}!</h2>
//             <p>Email: {user.email}</p>
//         </div>
//     );
// };

// export default Profile;
