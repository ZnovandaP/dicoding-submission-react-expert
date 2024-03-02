import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDetailThread } from '@/service/threads';
import type { DetailThread, DetailThreadWithEmailOwner } from '@/types/response/threads';
import { toast } from 'react-toastify';
import { Users } from '@/types/response/users';
import {
  asyncUpVoteCommentThread,
  asyncDownVoteCommentThread,
  asyncNeutralVoteCommentThread,
} from './vote-comment-thread';
import {
  asyncDownVoteDetailThread,
  asyncNeutralVoteDetailThread,
  asyncUpVoteDetailThread,
} from './vote-detail-thread-thunk';
import asyncPostCommentThread from './post-comment-thread-thunk';
import { asyncGetUsers } from '../users/get-users';

type InitialState = {
  data: DetailThreadWithEmailOwner | null
  message: string | null
  status: 'idle' | 'loading' | 'error' | 'success';
};

export const asyncDetailThread = createAsyncThunk(
  'thread/detailThread',
  async (threadId: string, { getState, dispatch }) => {
    try {
      await dispatch(asyncGetUsers());
      const { users: { data: dataUsers } } = getState() as { users: { data: Users } };
      const { data } = await getDetailThread(threadId);

      const detailThread = data.detailThread as DetailThread;
      const getUserOwnerTheThread = dataUsers.find((user) => detailThread.owner.id === user.id)!;

      return {
        ...detailThread,
        owner: {
          ...detailThread.owner,
          email: getUserOwnerTheThread.email,
        },
        totalComments: detailThread.comments.length,
        comments: detailThread.comments.map((comment) => {
          const getUserComment = dataUsers.find((user) => comment.owner.id === user.id)!;

          if (getUserComment) {
            return {
              ...comment,
              owner: {
                ...comment.owner,
                email: getUserComment.email,
              },
            };
          }
          return comment;
        }),
      } as DetailThreadWithEmailOwner;
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

const detailThreadSlice = createSlice({
  name: 'asyncDetailThread',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(asyncDetailThread.pending, (state) => {
        state.status = 'loading';
        state.message = 'Mohon tunggu...';
      })

      .addCase(asyncDetailThread.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = 'success';
        state.message = 'Data detail thread berhasil didapatkan!';
      })

      .addCase(asyncDetailThread.rejected, (state) => {
        state.status = 'error';
        state.message = 'Data detail thread gagal didapatkan!';
      })

    // * post comment thread

      .addCase(asyncPostCommentThread.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = 'success';
        state.message = 'Comment anda berhasil diposting!';
      })

      .addCase(asyncPostCommentThread.rejected, (state) => {
        state.status = 'error';
        state.message = 'Gagal memposting comment pada thread ini, silahkan coba kembali!';
        toast.error(state.message);
      })

    // * upVote detail Thread

      .addCase(asyncUpVoteDetailThread.fulfilled, (state, action) => {
        state.data = action.payload;
      })

      .addCase(asyncUpVoteDetailThread.rejected, (state) => {
        state.status = 'error';
        state.message = 'Thread tidak ditemukan! Silahkan refresh';
        toast.error(state.message);
      })

    // * downVote detail Thread

      .addCase(asyncDownVoteDetailThread.fulfilled, (state, action) => {
        state.data = action.payload;
      })

      .addCase(asyncDownVoteDetailThread.rejected, (state) => {
        state.status = 'error';
        state.message = 'Thread tidak ditemukan! Silahkan refresh';
        toast.error(state.message);
      })

    // * neutralVote detail Thread

      .addCase(asyncNeutralVoteDetailThread.fulfilled, (state, action) => {
        state.data = action.payload;
      })

      .addCase(asyncNeutralVoteDetailThread.rejected, (state) => {
        state.status = 'error';
        state.message = 'Thread tidak ditemukan! Silahkan refresh';
        toast.error(state.message);
      })

    // * upVote comment detail thread

      .addCase(asyncUpVoteCommentThread.fulfilled, (state, action) => {
        state.data = action.payload;
      })

      .addCase(asyncUpVoteCommentThread.rejected, (state) => {
        state.status = 'error';
        state.message = 'Comment tidak ditemukan! Silahkan refresh';
        toast.error(state.message);
      })

    // * downVote comment detail thread

      .addCase(asyncDownVoteCommentThread.fulfilled, (state, action) => {
        state.data = action.payload;
      })

      .addCase(asyncDownVoteCommentThread.rejected, (state) => {
        state.status = 'error';
        state.message = 'Comment tidak ditemukan! Silahkan refresh';
        toast.error(state.message);
      })

    // * neutralVote comment detail thread

      .addCase(asyncNeutralVoteCommentThread.fulfilled, (state, action) => {
        state.data = action.payload;
      })

      .addCase(asyncNeutralVoteCommentThread.rejected, (state) => {
        state.status = 'error';
        state.message = 'Comment tidak ditemukan! Silahkan refresh';
        toast.error(state.message);
      });
  },

});

export default detailThreadSlice;
