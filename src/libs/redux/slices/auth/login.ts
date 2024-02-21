import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { LoginParams, login } from '@/service/auth';

type InitialState = {
  data: string | null;
  message: string | null
  status: 'idle' | 'loading' | 'error' | 'success';
};

const initialState: InitialState = {
  data: null,
  message: null,
  status: 'idle',
};

export const asyncLogin = createAsyncThunk('auth/login', async (body: LoginParams) => {
  try {
    const data = await login(body);
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
});

const loginSlice = createSlice({
  name: 'asyncLogin',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(asyncLogin.pending, (state) => {
        state.status = 'loading';
        state.message = 'Mohon tunggu...';
      })

      .addCase(asyncLogin.fulfilled, (state, action) => {
        state.status = 'success';
        state.message = 'Login sukses selamat datang';
        state.data = action.payload.data.token;
      })

      .addCase(asyncLogin.rejected, (state) => {
        state.status = 'error';
        state.message = 'Login gagal, pastikan email dan password anda benar';
      });
  },
});

export default loginSlice;
