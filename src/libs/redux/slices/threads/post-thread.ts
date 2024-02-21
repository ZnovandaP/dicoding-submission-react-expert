import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { type PostThread, postThread } from '@/service/threads';

type InitialState = {
  message: string | null
  status: 'idle' | 'loading' | 'error' | 'success';
};

export const asyncPostThread = createAsyncThunk('thread/postThread', async (body: PostThread) => {
  try {
    const { data } = await postThread(body);
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
});

const initialState: InitialState = {
  message: null,
  status: 'idle',
};

const postThreadSlice = createSlice({
  name: 'asyncPostThread',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(asyncPostThread.pending, (state) => {
        state.status = 'loading';
        state.message = 'Mohon tunggu...';
      })

      .addCase(asyncPostThread.fulfilled, (state) => {
        state.status = 'success';
        state.message = 'Thread anda berhasil diposting!';
      })

      .addCase(asyncPostThread.rejected, (state) => {
        state.status = 'error';
        state.message = 'Thread anda gagal diposting!';
      });
  },

});

export default postThreadSlice;
