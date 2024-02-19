import React, { useState, useEffect } from 'react';
import axios from 'axios';
import api from '../api';


interface User {
    username: string;
    role: string;
}
const Profile = () => {
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get('/profile', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    },
                });
                setUser(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchUser();
    }, []);

    return (
        <div>
            {user && (
                <div className="text-center">
                    <h1>{user.username}</h1>
                    <p>{user.role}</p>
                </div>
            )}
        </div>
    );
};

export default Profile;