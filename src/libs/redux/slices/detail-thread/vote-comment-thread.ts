import { createAsyncThunk } from '@reduxjs/toolkit';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { downVoteComment, neutralVoteComment, upVoteComment } from '@/service/votes/comment';
import { DetailThreadWithEmailOwner } from '@/types/response/threads';
import { User } from '@/types/response/users';

export const asyncUpVoteCommentThread = createAsyncThunk(
  'commentThread/upVote',
  async (commentId: string, { dispatch, getState }) => {
    try {
      dispatch(showLoading());

      const {
        thread: { data: dataThread },
      } = getState() as { thread: { data: DetailThreadWithEmailOwner } };
      const { profile: { data: dataProfile } } = getState() as { profile: { data: User } };

      await upVoteComment({
        commentId,
        threadId: dataThread.id,
      });

      return {
        ...dataThread,
        comments: dataThread.comments.map((comment) => {
          if (comment.id === commentId) {
            return {
              ...comment,
              upVotesBy: comment.upVotesBy.includes(dataProfile.id)
                ? comment.upVotesBy
                : [...comment.upVotesBy, dataProfile.id],
              downVotesBy: comment.downVotesBy.includes(dataProfile.id)
                ? comment.downVotesBy.filter((userId) => userId !== dataProfile.id)
                : comment.downVotesBy,
            };
          }
          return comment;
        }),
      };
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
      dispatch(hideLoading());
    }
  },
);

export const asyncDownVoteCommentThread = createAsyncThunk(
  'commentThread/downVote',
  async (commentId: string, { dispatch, getState }) => {
    try {
      dispatch(showLoading());

      const {
        thread: { data: dataThread },
      } = getState() as { thread: { data: DetailThreadWithEmailOwner } };
      const { profile: { data: dataProfile } } = getState() as { profile: { data: User } };

      await downVoteComment({
        commentId,
        threadId: dataThread.id,
      });

      return {
        ...dataThread,
        comments: dataThread.comments.map((comment) => {
          if (comment.id === commentId) {
            return {
              ...comment,
              upVotesBy: comment.upVotesBy.includes(dataProfile.id)
                ? comment.upVotesBy.filter((userId) => userId !== dataProfile.id)
                : comment.upVotesBy,
              downVotesBy: comment.downVotesBy.includes(dataProfile.id)
                ? comment.downVotesBy
                : [...comment.downVotesBy, dataProfile.id],
            };
          }
          return comment;
        }),
      };
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
      dispatch(hideLoading());
    }
  },
);

export const asyncNeutralVoteCommentThread = createAsyncThunk(
  'commentThread/NeutralVote',
  async (commentId: string, { dispatch, getState }) => {
    try {
      dispatch(showLoading());

      const {
        thread: { data: dataThread },
      } = getState() as { thread: { data: DetailThreadWithEmailOwner } };
      const { profile: { data: dataProfile } } = getState() as { profile: { data: User } };

      await neutralVoteComment({
        commentId,
        threadId: dataThread.id,
      });

      return {
        ...dataThread,
        comments: dataThread.comments.map((comment) => {
          if (comment.id === commentId) {
            return {
              ...comment,
              upVotesBy: comment.upVotesBy.includes(dataProfile.id)
                ? comment.upVotesBy.filter((userId) => userId !== dataProfile.id)
                : comment.upVotesBy,
              downVotesBy: comment.downVotesBy.includes(dataProfile.id)
                ? comment.downVotesBy.filter((userId) => userId !== dataProfile.id)
                : comment.downVotesBy,
            };
          }
          return comment;
        }),
      };
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
      dispatch(hideLoading());
    }
  },
);
