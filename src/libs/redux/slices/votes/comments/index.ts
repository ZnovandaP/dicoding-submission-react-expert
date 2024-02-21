import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Vote } from '@/types/response/vote';
import {
  upVoteComment, downVoteComment, neutralVoteComment, type VoteCommentParams,
} from '@/service/votes/comment';

type InitialState = {
  data: Vote | null
  message: string | null
  status: 'idle' | 'loading' | 'error' | 'success';
};

export const asyncUpVoteComment = createAsyncThunk(
  'votes/upVoteComment',
  async ({ threadId, commentId }: VoteCommentParams) => {
    try {
      const { data } = await upVoteComment({ commentId, threadId });
      return data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
);

export const asyncDownVoteComment = createAsyncThunk(
  'votes/downVoteComment',
  async ({ threadId, commentId }: VoteCommentParams) => {
    try {
      const { data } = await downVoteComment({ commentId, threadId });
      return data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
);

export const asyncNeutralVoteComment = createAsyncThunk(
  'votes/neutralVoteComment',
  async ({ threadId, commentId }: VoteCommentParams) => {
    try {
      const { data } = await neutralVoteComment({ commentId, threadId });
      return data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
);

const initialState: InitialState = {
  data: null,
  message: null,
  status: 'idle',
};

const voteCommentSlice = createSlice({
  name: 'voteComment',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder

    // ! Up Vote Comment

      .addCase(asyncUpVoteComment.pending, (state) => {
        state.status = 'loading';
        state.message = 'Mohon tunggu...';
      })

      .addCase(asyncUpVoteComment.fulfilled, (state, actions) => {
        state.status = 'success';
        state.message = 'Anda menyukai comment ini!';
        state.data = actions.payload.vote as Vote;
      })

      .addCase(asyncUpVoteComment.rejected, (state) => {
        state.status = 'error';
        state.message = 'Gagal menyukai comment ini, silahkan coba kembali beberapa saat!';
      })

    // ! Down Vote Comment

      .addCase(asyncDownVoteComment.pending, (state) => {
        state.status = 'loading';
        state.message = 'Mohon tunggu...';
      })

      .addCase(asyncDownVoteComment.fulfilled, (state, actions) => {
        state.status = 'success';
        state.message = 'Anda tidak menyukai comment ini!';
        state.data = actions.payload.vote as Vote;
      })

      .addCase(asyncDownVoteComment.rejected, (state) => {
        state.status = 'error';
        state.message = 'Gagal tidak menyukai comment ini, silahkan coba kembali beberapa saat!';
      })

    // ! Neutral Vote Comment

      .addCase(asyncNeutralVoteComment.pending, (state) => {
        state.status = 'loading';
        state.message = 'Mohon tunggu...';
      })

      .addCase(asyncNeutralVoteComment.fulfilled, (state, actions) => {
        state.status = 'success';
        state.message = 'Anda menetralkan vote comment ini!';
        state.data = actions.payload.vote as Vote;
      })

      .addCase(asyncNeutralVoteComment.rejected, (state) => {
        state.status = 'error';
        state.message = 'Gagal tidak dapat meneralkan vote comment ini, silahkan coba kembali beberapa saat!';
      });
  },

});

export default voteCommentSlice;
