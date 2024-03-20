export const fakeThreadsResponse = {
  status: 'success',
  message: 'ok',
  data: {
    threads: [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ],
  },
};

export const fakeUsersResponse = {
  status: 'success',
  message: 'ok',
  data: {
    users: [
      {
        id: 'users-1',
        name: 'User Test 1',
        email: 'user@mail.com',
        avatar: 'https://generated-image-url.jpg',
      },
    ],
  },
};

export const fakeDetailThreadResponse = {
  status: 'success',
  message: 'ok',
  data: {
    detailThread: {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    },
  },
};

export const fakeLeaderboardsResponse = {
  status: 'success',
  message: 'ok',
  data: {
    leaderboards: [
      {
        user: {
          id: 'users-1',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
        score: 10,
      },
    ],
  },
};

export const fakeLoginResponse = {
  status: 'success',
  message: 'ok',
  data: {
    token: 'token-12345678',
  },
};

export const fakeErrorResponse = {
  status: 'error',
  message: 'Not Found',
  data: {},
};
