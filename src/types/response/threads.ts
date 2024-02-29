import type { Comment } from '@/types/response/comment';
import { User } from './users';

export type Thread = {
  id: string
  title: string
  body: string
  category: string
  createdAt: string
  ownerId: string
  upVotesBy: string[]
  downVotesBy: string[]
  totalComments: number
};

export type DetailThread = Omit<Thread, 'totalComments'> & {
  comments: Comment[]
};

export type Threads = Thread[];

export type ThreadWithAuthor = Thread & {
  author: Omit<User, 'id'>
};
