import axios from 'axios';
import { baseUrl } from '../common/fetch-with-auth';

export type LoginParams = {
  email: string;
  password: string;
};

export type RegisterParams = LoginParams & {
  name: string;
};

export const login = async ({ email, password }: LoginParams) => {
  try {
    const body = { email, password };
    const { data } = await axios.post(`${baseUrl}/login`, body);
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const register = async ({ email, password, name }: RegisterParams) => {
  try {
    const body = { email, password, name };
    const response = await axios.post(`${baseUrl}/register`, body);

    if (response.status === 400) {
      throw new Error(response.data.message);
    }

    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
