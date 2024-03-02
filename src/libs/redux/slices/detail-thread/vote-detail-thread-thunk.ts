import { createAsyncThunk } from '@reduxjs/toolkit';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { upVoteThread, downVoteThread, neutralVoteThread } from '@/service/votes/thread';
import { DetailThreadWithEmailOwner } from '@/types/response/threads';
import { User } from '@/types/response/users';

export const asyncUpVoteDetailThread = createAsyncThunk(
  'detailThread/upVote',
  async (threadId: string, { dispatch, getState }) => {
    try {
      dispatch(showLoading());

      const {
        thread: { data: dataThread },
      } = getState() as { thread: { data: DetailThreadWithEmailOwner } };
      const { profile: { data: dataProfile } } = getState() as { profile: { data: User } };

      await upVoteThread(threadId);

      return {
        ...dataThread,
        upVotesBy: dataThread.upVotesBy.includes(dataProfile.id)
          ? dataThread.upVotesBy
          : [...dataThread.upVotesBy, dataProfile.id],
        downVotesBy: dataThread.downVotesBy.includes(dataProfile.id)
          ? dataThread.downVotesBy.filter((userId) => userId !== dataProfile.id)
          : dataThread.downVotesBy,
      };
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
      dispatch(hideLoading());
    }
  },
);

export const asyncDownVoteDetailThread = createAsyncThunk(
  'detailThread/downVote',
  async (threadId: string, { dispatch, getState }) => {
    try {
      dispatch(showLoading());

      const {
        thread: { data: dataThread },
      } = getState() as { thread: { data: DetailThreadWithEmailOwner } };
      const { profile: { data: dataProfile } } = getState() as { profile: { data: User } };

      await downVoteThread(threadId);

      return {
        ...dataThread,
        upVotesBy: dataThread.upVotesBy.includes(dataProfile.id)
          ? dataThread.upVotesBy.filter((userId) => userId !== dataProfile.id)
          : dataThread.upVotesBy,
        downVotesBy: dataThread.downVotesBy.includes(dataProfile.id)
          ? dataThread.downVotesBy
          : [...dataThread.downVotesBy, dataProfile.id],
      };
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
      dispatch(hideLoading());
    }
  },
);

export const asyncNeutralVoteDetailThread = createAsyncThunk(
  'detailThread/NeutralVote',
  async (threadId: string, { dispatch, getState }) => {
    try {
      dispatch(showLoading());

      const {
        thread: { data: dataThread },
      } = getState() as { thread: { data: DetailThreadWithEmailOwner } };
      const { profile: { data: dataProfile } } = getState() as { profile: { data: User } };

      await neutralVoteThread(threadId);

      return {
        ...dataThread,
        upVotesBy: dataThread.upVotesBy.includes(dataProfile.id)
          ? dataThread.upVotesBy.filter((userId) => userId !== dataProfile.id)
          : dataThread.upVotesBy,
        downVotesBy: dataThread.downVotesBy.includes(dataProfile.id)
          ? dataThread.downVotesBy.filter((userId) => userId !== dataProfile.id)
          : dataThread.downVotesBy,
      };
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
      dispatch(hideLoading());
    }
  },
);
