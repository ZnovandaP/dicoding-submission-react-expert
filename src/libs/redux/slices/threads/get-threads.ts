import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getAllUsers } from '@/service/users';
import { getAllThreads } from '@/service/threads';
import { Users } from '@/types/response/users';
import type { ThreadWithOwner, Threads } from '@/types/response/threads';
import { asyncUpVoteThread, asyncDownVoteThread, asyncNeutralVoteThread } from './vote-threads-thunk';

export type InitialState = {
  data: ThreadWithOwner[] | null
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
        owner: {
          name: author.name,
          email: author.email,
          avatar: author.avatar,
        },
      };
    }) as ThreadWithOwner[];
  } catch (error: any) {
    throw new Error(error.message);
  }
});

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
