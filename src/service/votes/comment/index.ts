import { fetchWithAuth } from '@/service/common/fetch-with-auth';

// * Note: voteType value can be 1 (up-vote), 0 (neutral), or -1 (down-vote)

export type VoteCommentParams = {
  threadId: string
  commentId: string
};

export const upVoteComment = async ({ threadId, commentId }: VoteCommentParams) => {
  try {
    const data = await fetchWithAuth({
      method: 'post',
      endpoint: `threads/${threadId}/comments/${commentId}/up-vote`,
    });
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const downVoteComment = async ({ threadId, commentId }: VoteCommentParams) => {
  try {
    const data = await fetchWithAuth({
      method: 'post',
      endpoint: `threads/${threadId}/comments/${commentId}/down-vote`,
    });
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const neutralVoteComment = async ({ threadId, commentId }: VoteCommentParams) => {
  try {
    const data = await fetchWithAuth({
      method: 'post',
      endpoint: `threads/${threadId}/comments/${commentId}/neutral-vote`,
    });
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
