import axios from 'axios';
import { baseUrl, fetchWithAuth } from '../common/fetch-with-auth';

export type PostThread = {
  title: string
  body: string
  category: string
};

export const getAllThreads = async () => {
  try {
    const { data } = await axios.get(`${baseUrl}/threads`);
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getDetailThread = async (threadId: string) => {
  try {
    const { data } = await axios.get(`${baseUrl}/threads/${threadId}`);
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const postThread = async (body: PostThread) => {
  try {
    const data = await fetchWithAuth({
      method: 'post',
      endpoint: 'threads',
      options: {
        data: body,
      },
    });
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
