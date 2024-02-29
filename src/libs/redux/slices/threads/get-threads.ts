import { toast } from 'react-toastify';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { getAllUsers } from '@/service/users';
import { getAllThreads } from '@/service/threads';
import { downVoteThread, neutralVoteThread, upVoteThread } from '@/service/votes/thread';
import { Users } from '@/types/response/users';
import { Vote } from '@/types/response/vote';
import type { ThreadWithAuthor, Threads } from '@/types/response/threads';

type InitialState = {
  data: ThreadWithAuthor[] | null
  message: string | null
  status: 'idle' | 'loading' | 'error' | 'success';
};

export const asyncGetThreadsWithAuthor = createAsyncThunk('thread/getThreadsWithAuthor', async () => {
  try {
    const { data: dataThreads } = await getAllThreads();
    const { data: dataUsers } = await getAllUsers();

    const threads = dataThreads.threads as Threads;
    const users = dataUsers.users as Users;

    return threads.map((thread) => {
      const author = users.find((user) => thread.ownerId === user.id);

      if (typeof author === 'undefined') return thread;

      return {
        ...thread,
        author: {
          name: author.name,
          email: author.email,
          avatar: author.avatar,
        },
      };
    }) as ThreadWithAuthor[];
  } catch (error: any) {
    throw new Error(error.message);
  }
});

export const asyncUpVoteThread = createAsyncThunk(
  'thread/upVote',
  async (threadId: string, { dispatch, getState }) => {
    try {
      dispatch(showLoading());
      await upVoteThread(threadId);

      const { threads } = getState() as { threads: { data: ThreadWithAuthor[] } };
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

      const { threads } = getState() as { threads: { data: ThreadWithAuthor[] } };
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

      const threadWithAuthor = threads.data as ThreadWithAuthor[];

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

const initialState: InitialState = {
  data: null,
  message: null,
  status: 'idle',
};

const getThreadsSlice = createSlice({
  name: 'asyncGetThreadsWithAuthor',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(asyncGetThreadsWithAuthor.pending, (state) => {
        state.status = 'loading';
        state.message = 'Mohon tunggu...';
      })

      .addCase(asyncGetThreadsWithAuthor.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = 'success';
        state.message = 'Data threads berhasil didapatkan!';
      })

      .addCase(asyncUpVoteThread.fulfilled, (state, action) => {
        state.data = action.payload;
      })

      .addCase(asyncDownVoteThread.fulfilled, (state, action) => {
        state.data = action.payload;
      })

      .addCase(asyncNeutralVoteThread.fulfilled, (state, action) => {
        state.data = action.payload;
      })

      .addCase(asyncUpVoteThread.rejected, (state) => {
        state.status = 'error';
        state.message = 'Thread tidak ditemukan! Silahkan refresh';
        toast.error(state.message);
      })

      .addCase(asyncDownVoteThread.rejected, (state) => {
        state.status = 'error';
        state.message = 'Thread tidak ditemukan! Silahkan refresh';
        toast.error(state.message);
      })

      .addCase(asyncNeutralVoteThread.rejected, (state) => {
        state.status = 'error';
        state.message = 'Thread tidak ditemukan! Silahkan refresh';
        toast.error(state.message);
      });
  },

});

export default getThreadsSlice;
