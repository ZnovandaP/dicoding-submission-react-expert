import type { Comment } from '@/types/response/comment';

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

export type DetailThread = Exclude<Thread, 'totalComments'> & {
  comments: Comment[]
};

export type Threads = Thread[];
