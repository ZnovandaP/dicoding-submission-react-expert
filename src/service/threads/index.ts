import { fetchWithAuth } from '../common/fetch-with-auth';

type PostThread = {
  title: string
  body: string
  category: string
};

export const getAllThreads = async () => {
  try {
    const data = await fetchWithAuth({
      method: 'get',
      endpoint: 'threads',
    });
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getDetailThread = async (threadId: string) => {
  try {
    const data = await fetchWithAuth({
      method: 'get',
      endpoint: `threads/${threadId}`,
    });
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
