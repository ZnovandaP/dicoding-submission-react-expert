import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import getLeaderboards from '@/service/leaderboards';
import type { UserLeaderboards } from '@/types/response/users';

type InitialState = {
  data: UserLeaderboards | null
  message: string | null
  status: 'idle' | 'loading' | 'error' | 'success';
};

export const asyncGetLeaderboards = createAsyncThunk('users/leaderboards', async () => {
  try {
    const { data } = await getLeaderboards();
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

const getLeaderboardsSlice = createSlice({
  name: 'asyncGetLeaderboards',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(asyncGetLeaderboards.pending, (state) => {
        state.status = 'loading';
        state.message = 'Mohon tunggu...';
      })

      .addCase(asyncGetLeaderboards.fulfilled, (state, action) => {
        state.data = action.payload.users as UserLeaderboards;
        state.status = 'success';
        state.message = 'Data seluruh pengguna didapatkan!';
      })

      .addCase(asyncGetLeaderboards.rejected, (state) => {
        state.status = 'error';
        state.message = 'Data pengguna gagal didapatkan!';
      });
  },

});

export default getLeaderboardsSlice;
