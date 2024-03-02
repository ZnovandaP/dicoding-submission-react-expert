import type { Comment, CommentWithEmailOwner } from '@/types/response/comment';
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

export interface DetailThread extends Omit<Thread, 'totalComments' | 'ownerId'> {
  owner:Pick<Comment, 'owner'>['owner'],
  comments: Comment[]
}

export interface DetailThreadWithEmailOwner extends DetailThread {
  owner:User
  comments: CommentWithEmailOwner[]
  totalComments: number
}

export interface ThreadWithOwner extends Thread {
  owner: Omit<User, 'id'>
}

export type Threads = Thread[];
