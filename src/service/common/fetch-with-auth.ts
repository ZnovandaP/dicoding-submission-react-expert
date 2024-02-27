import axios, { AxiosRequestConfig } from 'axios';
import { getSession } from 'next-auth/react';

// * Api documentations: https://forum-api.dicoding.dev/v1

type FetchWithAuthParams = {
  method: 'get' | 'post' | 'put' | 'patch' | 'delete'
  endpoint: string;
  options?: AxiosRequestConfig
};

export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_FORUM_API as string;

export const fetchWithAuth = async ({
  endpoint, options, method,
}: FetchWithAuthParams) => {
  try {
    const session = await getSession();
    const getAccessTokenFromSession = session?.user.accessToken;
    const { data } = await axios.request({
      ...options,
      method,
      url: `${baseUrl}/${endpoint}`,
      headers: {
        Authorization: `Bearer ${getAccessTokenFromSession}`,
      },
    });
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
