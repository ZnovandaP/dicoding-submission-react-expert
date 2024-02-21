import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDetailThread } from '@/service/threads';
import type { DetailThread } from '@/types/response/threads';

type InitialState = {
  data: DetailThread | null
  message: string | null
  status: 'idle' | 'loading' | 'error' | 'success';
};

export const asyncDetailThread = createAsyncThunk('thread/detailThread', async (threadId: string) => {
  try {
    const { data } = await getDetailThread(threadId);
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

const detailThreadSlice = createSlice({
  name: 'asyncDetailThread',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(asyncDetailThread.pending, (state) => {
        state.status = 'loading';
        state.message = 'Mohon tunggu...';
      })

      .addCase(asyncDetailThread.fulfilled, (state, action) => {
        state.data = action.payload.detailThread as DetailThread;
        state.status = 'success';
        state.message = 'Data detail thread berhasil didapatkan!';
      })

      .addCase(asyncDetailThread.rejected, (state) => {
        state.status = 'error';
        state.message = 'Data detail thread gagal didapatkan!';
      });
  },

});

export default detailThreadSlice;
