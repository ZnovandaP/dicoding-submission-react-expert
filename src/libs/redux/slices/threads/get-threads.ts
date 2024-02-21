import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllThreads } from '@/service/threads';
import type { Threads } from '@/types/response/threads';

type InitialState = {
  data: Threads | null
  message: string | null
  status: 'idle' | 'loading' | 'error' | 'success';
};

export const asyncGetThreads = createAsyncThunk('thread/getThreads', async () => {
  try {
    const { data } = await getAllThreads();
    return data;
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
  name: 'asyncGetThreads',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(asyncGetThreads.pending, (state) => {
        state.status = 'loading';
        state.message = 'Mohon tunggu...';
      })

      .addCase(asyncGetThreads.fulfilled, (state, action) => {
        state.data = action.payload.threads as Threads;
        state.status = 'success';
        state.message = 'Data threads berhasil didapatkan!';
      })

      .addCase(asyncGetThreads.rejected, (state) => {
        state.status = 'error';
        state.message = 'Data threads gagal didapatkan!';
      });
  },

});

export default getThreadsSlice;
