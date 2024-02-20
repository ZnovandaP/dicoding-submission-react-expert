import axios from 'axios';
import { baseUrl } from '../common/fetch-with-auth';

type LoginParams = {
  email: string;
  password: string;
};

type RegisterParams = LoginParams & {
  name: string;
};

export const login = async ({ email, password }: LoginParams) => {
  try {
    if (!email || !password) {
      throw new Error('Email dan password sangat dibutuhkan');
    }

    if (password.length < 6) {
      throw new Error('Minimal 6 karakter password');
    }
    const body = { email, password };
    const { data } = await axios.post(`${baseUrl}/login`, body);
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const register = async ({ email, password, name }: RegisterParams) => {
  try {
    if (!email || !password || !name) {
      throw new Error('Email dan password sangat dibutuhkan');
    }

    if (password.length < 6) {
      throw new Error('Minimal 6 karakter password');
    }
    const body = { email, password, name };
    const { data } = await axios.post(`${baseUrl}/register`, body);
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
