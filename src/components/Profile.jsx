import { useContext, useEffect, useState } from 'react';
import { useApiContext } from '../context/ApiProvider';


const Profile = () => {
    const { accessToken, auth } = useApiContext();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    return (
        // <div style={{ marginTop: '150px', padding: '20px' }}></div>
        <div className='profile-container'>
            <div className="profile-center">
            {auth.username ? 
                <> 
                <h2>Welcome, <span>{auth.first_name}</span></h2>
                <p>User Email: {auth.email}</p>
                </>
            : 
                <>
                    <h1>Hello, and welcome to this page</h1>
                </>
            }
            </div>
        </div>
    );
};

export default Profile; 