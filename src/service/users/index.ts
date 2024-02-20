import axios from 'axios';
import { baseUrl, fetchWithAuth } from '../common/fetch-with-auth';

export const getAllUser = async () => {
  try {
    const { data } = await axios.get(`${baseUrl}/users`);
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getOwnProfile = async () => {
  try {
    const data = await fetchWithAuth({
      method: 'get',
      endpoint: 'users/me',
    });

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
