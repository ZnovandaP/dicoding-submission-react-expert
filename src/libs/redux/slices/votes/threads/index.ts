import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { upVoteThread, downVoteThread, neutralVoteThread } from '@/service/votes/thread';
import type { Vote } from '@/types/response/vote';

type InitialState = {
  data: Vote | null
  message: string | null
  status: 'idle' | 'loading' | 'error' | 'success';
};

export const asyncUpVoteThread = createAsyncThunk('votes/upVoteThread', async (threadId: string) => {
  try {
    const { data } = await upVoteThread(threadId);
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
});

export const asyncDownVoteThread = createAsyncThunk('votes/downVoteThread', async (threadId: string) => {
  try {
    const { data } = await downVoteThread(threadId);
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
});

export const asyncNeutralVoteThread = createAsyncThunk('votes/neutralVoteThread', async (threadId: string) => {
  try {
    const { data } = await neutralVoteThread(threadId);
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

const voteThreadSlice = createSlice({
  name: 'voteThread',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder

    // ! Up Vote Thread

      .addCase(asyncUpVoteThread.pending, (state) => {
        state.status = 'loading';
        state.message = 'Mohon tunggu...';
      })

      .addCase(asyncUpVoteThread.fulfilled, (state, actions) => {
        state.status = 'success';
        state.message = 'Anda menyukai thread ini!';
        state.data = actions.payload.vote as Vote;
      })

      .addCase(asyncUpVoteThread.rejected, (state) => {
        state.status = 'error';
        state.message = 'Gagal menyukai thread ini, silahkan coba kembali beberapa saat!';
      })

    // ! Down Vote Thread

      .addCase(asyncDownVoteThread.pending, (state) => {
        state.status = 'loading';
        state.message = 'Mohon tunggu...';
      })

      .addCase(asyncDownVoteThread.fulfilled, (state, actions) => {
        state.status = 'success';
        state.message = 'Anda tidak menyukai thread ini!';
        state.data = actions.payload.vote as Vote;
      })

      .addCase(asyncDownVoteThread.rejected, (state) => {
        state.status = 'error';
        state.message = 'Gagal tidak menyukai thread ini, silahkan coba kembali beberapa saat!';
      })

    // ! Neutral Vote Thread

      .addCase(asyncNeutralVoteThread.pending, (state) => {
        state.status = 'loading';
        state.message = 'Mohon tunggu...';
      })

      .addCase(asyncNeutralVoteThread.fulfilled, (state, actions) => {
        state.status = 'success';
        state.message = 'Anda menetralkan vote thread ini!';
        state.data = actions.payload.vote as Vote;
      })

      .addCase(asyncNeutralVoteThread.rejected, (state) => {
        state.status = 'error';
        state.message = 'Gagal tidak dapat meneralkan vote thread ini, silahkan coba kembali beberapa saat!';
      });
  },

});

export default voteThreadSlice;
