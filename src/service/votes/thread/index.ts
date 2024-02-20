import { fetchWithAuth } from '@/service/common/fetch-with-auth';

// * Note: voteType value can be 1 (up-vote), 0 (neutral), or -1 (down-vote)

export const upVoteThread = async (threadId: string) => {
  try {
    const data = await fetchWithAuth({
      method: 'post',
      endpoint: `threads/${threadId}/up-vote`,
    });
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const downVoteThread = async (threadId: string) => {
  try {
    const data = await fetchWithAuth({
      method: 'post',
      endpoint: `threads/${threadId}/down-vote`,
    });
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const neutralVoteThread = async (threadId: string) => {
  try {
    const data = await fetchWithAuth({
      method: 'post',
      endpoint: `threads/${threadId}/neutral-vote`,
    });
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
