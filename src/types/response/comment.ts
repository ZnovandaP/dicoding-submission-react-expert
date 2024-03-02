export type Comment = {
  id: string
  content: string
  createdAt: string
  owner: {
    id: string
    name: string
    avatar: string
  },
  upVotesBy: string[]
  downVotesBy: string[]
};

export type CommentWithEmailOwner = Omit<Comment, 'owner'> & {
  owner: Pick<Comment, 'owner'>['owner'] & {
    email: string
  }
};
