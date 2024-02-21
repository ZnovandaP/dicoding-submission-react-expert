import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { register, RegisterParams } from '@/service/auth';

type InitialState = {
  message: string | null
  status: 'idle' | 'loading' | 'error' | 'success';
};

export const asyncRegister = createAsyncThunk('auth/register', async (body: RegisterParams) => {
  try {
    const data = await register(body);
    return data;
  } catch (error: any) {
    throw new Error(error.message);
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
      })

      .addCase(asyncRegister.rejected, (state) => {
        state.status = 'error';
        state.message = 'Registrasi gagal, silahkan coba kembali beberapa saat!';
      });
  },

});

export default registerSlice;
