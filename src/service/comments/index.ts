import { fetchWithAuth } from '../common/fetch-with-auth';

export type PostCommentParams = {
  body: {
    content: string
  }
  threadId: string
};

export const postComment = async ({ body, threadId }: PostCommentParams) => {
  try {
    const data = await fetchWithAuth({
      method: 'post',
      endpoint: `threads/${threadId}/comments`,
      options: {
        data: body,
      },
    });
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
