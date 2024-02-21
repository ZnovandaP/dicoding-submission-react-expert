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
