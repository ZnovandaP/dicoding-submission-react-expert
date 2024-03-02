import { createAsyncThunk } from '@reduxjs/toolkit';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { postComment } from '@/service/comments';
import { DetailThreadWithEmailOwner } from '@/types/response/threads';
import { Comment, CommentWithEmailOwner } from '@/types/response/comment';
import { User } from '@/types/response/users';

const asyncPostCommentThread = createAsyncThunk(
  'commentThread/postComment',
  async (body: { content: string }, { dispatch, getState }) => {
    try {
      dispatch(showLoading());

      const {
        thread: { data: dataThread },
      } = getState() as { thread: { data: DetailThreadWithEmailOwner } };

      const {
        profile: { data: dataProfile },
      } = getState() as { profile: { data: User } };

      const { data } = await postComment({
        threadId: dataThread.id,
        body,
      });

      const newComment = data.comment as Comment;

      const commentWithEmail:CommentWithEmailOwner = {
        ...newComment,
        owner: {
          ...newComment.owner,
          email: dataProfile.email,
        },
      };

      return {
        ...dataThread,
        totalComments: dataThread.totalComments + 1,
        comments: [commentWithEmail, ...dataThread.comments],
      };
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
      dispatch(hideLoading());
    }
  },
);

export default asyncPostCommentThread;
