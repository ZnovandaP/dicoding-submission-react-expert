import { createAsyncThunk } from '@reduxjs/toolkit';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { postComment } from '@/service/comments';
import { DetailThreadWithEmailOwner } from '@/types/response/threads';
import { Comment, CommentWithEmailOwner } from '@/types/response/comment';
import { User } from '@/types/response/users';
import { toast } from 'react-toastify';

const asyncPostCommentThread = createAsyncThunk(
  'commentThread/postComment',
  async (body: { content: string }, { dispatch, getState }) => {
    const {
      thread: { data: dataThread },
    } = getState() as { thread: { data: DetailThreadWithEmailOwner } };

    const {
      profile: { data: dataProfile },
    } = getState() as { profile: { data: User } };

    try {
      dispatch(showLoading());

      const { data } = await postComment({
        threadId: dataThread.id,
        body,
      });

      toast.success('Komentar berhasil ditambahkan');

      const newComment = data.comment as Comment;

      const commentWithEmail:CommentWithEmailOwner = {
        ...newComment,
        owner: {
          ...newComment.owner,
          email: dataProfile.email,
        },
      };

      return {
        ...dataThread,
        totalComments: dataThread.totalComments + 1,
        comments: [commentWithEmail, ...dataThread.comments],
      };
    } catch (error: any) {
      if (error.message.includes('404')) {
        toast.error('Komentar tidak ditemukan! silahkan refresh halaman');
      } else {
        toast.error('Komentar gagal diposting! file konten terlalu besar');
      }
      return dataThread;
    } finally {
      dispatch(hideLoading());
    }
  },
);

export default asyncPostCommentThread;
