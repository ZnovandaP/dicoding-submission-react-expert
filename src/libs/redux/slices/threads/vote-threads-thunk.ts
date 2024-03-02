import { createAsyncThunk } from '@reduxjs/toolkit';
import { upVoteThread, downVoteThread, neutralVoteThread } from '@/service/votes/thread';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { Vote } from '@/types/response/vote';
import { ThreadWithOwner } from '@/types/response/threads';

export const asyncUpVoteThread = createAsyncThunk(
  'thread/upVote',
  async (threadId: string, { dispatch, getState }) => {
    try {
      dispatch(showLoading());
      await upVoteThread(threadId);

      const { threads } = getState() as { threads: { data: ThreadWithOwner[] } };
      const { profile } = getState() as { profile: { data: Vote } };

      const profileId = profile.data?.id;

      return threads.data?.map((thread) => {
        if (thread.id === threadId) {
          return {
            ...thread,
            upVotesBy: thread.upVotesBy.includes(profileId)
              ? thread.upVotesBy
              : [...thread.upVotesBy, profileId],
            downVotesBy: thread.downVotesBy.includes(profileId)
              ? thread.downVotesBy.filter((voteId) => voteId !== profileId)
              : thread.downVotesBy,
          };
        }
        return thread;
      });
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
      dispatch(hideLoading());
    }
  },
);

export const asyncDownVoteThread = createAsyncThunk(
  'thread/downVote',
  async (threadId: string, { dispatch, getState }) => {
    try {
      dispatch(showLoading());
      await downVoteThread(threadId);

      const { threads } = getState() as { threads: { data: ThreadWithOwner[] } };
      const { profile } = getState() as { profile: { data: Vote } };

      const profileId = profile.data?.id;

      return threads.data?.map((thread) => {
        if (thread.id === threadId) {
          return {
            ...thread,
            upVotesBy: thread.upVotesBy.includes(profileId)
              ? thread.upVotesBy.filter((voteId) => voteId !== profileId)
              : thread.upVotesBy,
            downVotesBy: thread.downVotesBy.includes(profileId)
              ? thread.downVotesBy
              : [...thread.downVotesBy, profileId],
          };
        }
        return thread;
      });
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
      dispatch(hideLoading());
    }
  },
);

export const asyncNeutralVoteThread = createAsyncThunk(
  'thread/NeutralVote',
  async (threadId: string, { dispatch, getState }) => {
    try {
      dispatch(showLoading());
      const { threads } = getState() as any;
      const { data }: { data: { vote: Vote } } = await neutralVoteThread(threadId);

      const threadWithAuthor = threads.data as ThreadWithOwner[];

      return threadWithAuthor.map((thread) => {
        if (thread.id === threadId) {
          return {
            ...thread,
            upVotesBy: thread.upVotesBy.filter((voteId) => voteId !== data.vote.userId),
            downVotesBy: thread.downVotesBy.filter((voteId) => voteId !== data.vote.userId),
          };
        }
        return thread;
      });
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
      dispatch(hideLoading());
    }
  },
);
