import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { register, RegisterParams } from '@/service/auth';
import { toast } from 'react-toastify';
import { hideLoading, showLoading } from 'react-redux-loading-bar';

type InitialState = {
  message: string | null
  status: 'idle' | 'loading' | 'error' | 'success';
};

export const asyncRegister = createAsyncThunk('auth/register', async (body: RegisterParams, { dispatch }) => {
  try {
    dispatch(showLoading());
    const data = await register(body);
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  } finally {
    dispatch(hideLoading());
  }
});

const initialState: InitialState = {
  message: null,
  status: 'idle',
};

const registerSlice = createSlice({
  name: 'asyncRegister',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(asyncRegister.pending, (state) => {
        state.status = 'loading';
        state.message = 'Mohon tunggu...';
      })

      .addCase(asyncRegister.fulfilled, (state) => {
        state.status = 'success';
        state.message = 'Registrasi sukses silahkan login';
        toast.success(state.message);
      })

      .addCase(asyncRegister.rejected, (state) => {
        state.status = 'error';
        state.message = 'Registrasi gagal, email ini sudah terdaftar';
        toast.error(state.message);
      });
  },

});

export default registerSlice;
