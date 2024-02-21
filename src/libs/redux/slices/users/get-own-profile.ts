import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOwnProfile } from '@/service/users';
import type { User } from '@/types/response/users';

type InitialState = {
  data: User | null
  message: string | null
  status: 'idle' | 'loading' | 'error' | 'success';
};

export const asyncGetUsers = createAsyncThunk('user/profile', async () => {
  try {
    const { data } = await getOwnProfile();
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

const getProfileSlice = createSlice({
  name: 'asyncGetUsers',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(asyncGetUsers.pending, (state) => {
        state.status = 'loading';
        state.message = 'Mohon tunggu...';
      })

      .addCase(asyncGetUsers.fulfilled, (state, action) => {
        state.data = action.payload.user as User;
        state.status = 'success';
        state.message = 'Data profile pengguna didapatkan!';
      })

      .addCase(asyncGetUsers.rejected, (state) => {
        state.status = 'error';
        state.message = 'Data profile pengguna gagal didapatkan!';
      });
  },

});

export default getProfileSlice;
