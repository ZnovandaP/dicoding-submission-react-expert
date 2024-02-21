import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { PostCommentParams, postComment } from '@/service/comments';

type InitialState = {
  message: string | null
  status: 'idle' | 'loading' | 'error' | 'success';
};

export const asyncPostComment = createAsyncThunk(
  'comments/postComment',
  async ({ body, threadId }: PostCommentParams) => {
    try {
      const { data } = await postComment({ body, threadId });
      return data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
);

const initialState: InitialState = {
  message: null,
  status: 'idle',
};

const postCommentSlice = createSlice({
  name: 'asyncPostComment',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(asyncPostComment.pending, (state) => {
        state.status = 'loading';
        state.message = 'Mohon tunggu...';
      })

      .addCase(asyncPostComment.fulfilled, (state) => {
        state.status = 'success';
        state.message = 'Komentar anda berhasil diposting!';
      })

      .addCase(asyncPostComment.rejected, (state) => {
        state.status = 'error';
        state.message = 'Komentar anda gagal diposting, silahkan coba kembali beberapa saat!';
      });
  },

});

export default postCommentSlice;
