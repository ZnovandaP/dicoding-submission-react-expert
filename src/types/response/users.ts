export type User = {
  id: string
  name: string
  email: string
  avatar: string
};

export type UserWithScore = {
  user: User
  score: number
};

export type Users = User[];

export type UserLeaderboards = UserWithScore[];
