import axios from 'axios';
import { getItemFromLocalStorage, setItemInLocalStorage } from '../localStorage';

const api = axios.create({
  baseURL: 'http://localhost:3001/auth',
});

export const signIn = async (fullName: string, password: string) => {
  try {
      const response = await api.post("/login", {
          fullName,
          password,
      });
      setItemInLocalStorage('accessToken', response.data.access_token);
      return response.data;
  } catch (error) {
      console.error('Error signing in:', error);
      throw error;
  }
};

export const signUp = async (fullName: string, password: string, role?: string) => {
  try {
      const response = await api.post("/register", {
          fullName,
          password,
          role,
      });
      return response.data;
  } catch (error) {
      console.error('Error signing up:', error);
      throw error;
  }
};

export const fetchUser = async () => {
  const accessToken = getItemFromLocalStorage('accessToken', '');

    try {
        const response = await api.get('/profile', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user profile:', error);
        throw error;
    }
};
