import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllUsers } from '@/service/users';
import type { Users } from '@/types/response/users';

type InitialState = {
  data: Users | null
  message: string | null
  status: 'idle' | 'loading' | 'error' | 'success';
};

export const asyncGetUsers = createAsyncThunk('users/getAllUsers', async () => {
  try {
    const { data } = await getAllUsers();
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

const getUsersSlice = createSlice({
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
        state.data = action.payload.users as Users;
        state.status = 'success';
        state.message = 'Data seluruh pengguna didapatkan!';
      })

      .addCase(asyncGetUsers.rejected, (state) => {
        state.status = 'error';
        state.message = 'Data pengguna gagal didapatkan!';
      });
  },

});

export default getUsersSlice;
