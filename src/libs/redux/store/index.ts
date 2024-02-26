import { configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook, useDispatch, useSelector, useStore,
} from 'react-redux';
import { loadingBarReducer } from 'react-redux-loading-bar';

import loginSlice from '../slices/auth/login';
import registerSlice from '../slices/auth/register';
import getUsersSlice from '../slices/users/get-users';
import getProfileSlice from '../slices/users/get-own-profile';
import getThreadsSlice from '../slices/threads/get-threads';
import postThreadSlice from '../slices/threads/post-thread';
import detailThreadSlice from '../slices/threads/detail-thread';
import postCommentSlice from '../slices/comments/post-comment';
import voteThreadSlice from '../slices/votes/threads';
import voteCommentSlice from '../slices/votes/comments';
import getLeaderboardsSlice from '../slices/leaderboards';

export const makeStore = () => (
  configureStore({
    reducer: {
      login: loginSlice.reducer,
      register: registerSlice.reducer,
      users: getUsersSlice.reducer,
      profile: getProfileSlice.reducer,
      thread: detailThreadSlice.reducer,
      threads: getThreadsSlice.reducer,
      postThread: postThreadSlice.reducer,
      postComment: postCommentSlice.reducer,
      voteThread: voteThreadSlice.reducer,
      voteComment: voteCommentSlice.reducer,
      leaderboards: getLeaderboardsSlice.reducer,
      loadingBar: loadingBarReducer,
    },
  })
);

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore: () => AppStore = useStore;
