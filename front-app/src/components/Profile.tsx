import { useState, useEffect } from 'react';
import { fetchUser } from '../utils/api/api';

interface User {
    username: string;
    role: string;
}
const Profile = () => {
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await fetchUser();
                setUser(userData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
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