export const currentUserMock = {
  fullName: "Natalia Test2",
  id: "9ff6801b-b7b4-49a4-886b-b8212d50181e",
  firstName: "Natalia",
  lastName: "Test2",
  email: "mail2@mail.com",
  avatar: "https://web-chat-storage.s3.amazonaws.com/users-avatars/undefined_Simulator%20Screen%20Shot%20-%20iPhone%2011%20-%202022-11-14%20at%2012.38.30.png",
  role: "user",
  isBanned: false,
  createdAt: "2022-11-09T06:43:50.000Z",
  updatedAt: "2022-11-14T19:15:44.000Z"
}

export const currentUserAdminMock = {
  fullName: "Natalia Test2",
  id: "9ff6801b-b7b4-49a4-886b-b8212d50181e",
  firstName: "Natalia",
  lastName: "Test2",
  email: "mail2@mail.com",
  avatar: "https://web-chat-storage.s3.amazonaws.com/users-avatars/undefined_Simulator%20Screen%20Shot%20-%20iPhone%2011%20-%202022-11-14%20at%2012.38.30.png",
  role: "admin",
  isBanned: false,
  createdAt: "2022-11-09T06:43:50.000Z",
  updatedAt: "2022-11-14T19:15:44.000Z"
}

export const chatsMock = [
  {
    id: "aeea4be4-91d4-436a-804a-cf6565261a6a",
    lastMessageText: "sdsad\n",
    updatedAt: "2022-11-14T19:15:32.000Z",
    name: "Natalia-2 Makarchuk",
    icon: "https://web-chat-storage.s3.amazonaws.com/users-avatars/undefined_mail1%40mail.com-avatar.jpeg",
    chatBanned: false
  },
  {
    id: "35ed92a2-1574-41a9-8f30-90c950a0109e",
    lastMessageText: "1\n",
    updatedAt: "2022-11-11T10:39:28.000Z",
    name: "Natalia Test1",
    icon: null,
    chatBanned: true
  }
]

export const chatsListPaginationMock = {
  currentPage: 0,
  totalItems: 2,
  totalPages: 1,
}

export const chatsListMock = {
  ...chatsListPaginationMock,
  chats: chatsMock
}

export const usersMock = [
  {
    fullName: "Natalia Test2",
    id: "9ff6801b-b7b4-49a4-886b-b8212d50181e",
    firstName: "Natalia",
    lastName: "Test2",
    email: "mail2@mail.com",
    avatar: "https://web-chat-storage.s3.amazonaws.com/users-avatars/undefined_Simulator%20Screen%20Shot%20-%20iPhone%2011%20-%202022-11-14%20at%2012.38.30.png",
    role: "user",
    isBanned: false,
    createdAt: "2022-11-09T06:43:50.000Z",
    updatedAt: "2022-11-14T19:15:44.000Z"
  },
  {
    fullName: "Natalia Test2",
    id: "9ff6801b-b7b4-49a4-886b-b8212d501812",
    firstName: "Natalia",
    lastName: "Test1",
    email: "mail1@mail.com",
    avatar: null,
    role: "user",
    isBanned: false,
    createdAt: "2022-11-09T06:43:50.000Z",
    updatedAt: "2022-11-14T19:15:44.000Z"
  }
]

export const usersListMock = {
  currentPage: 0,
  totalItems: 2,
  totalPages: 1,
  users: usersMock
}

export const messagesMock = [
  {
    chatId: "eb5ec184-9927-487e-aaec-935feca2631a",
    createdAt: "2022-11-18T16:22:09.000Z",
    id: "35df0b26-608e-47a6-a5f0-066aa4615a4e",
    text: "Hello",
    updatedAt: "2022-11-18T16:22:09.000Z",
    userId: "e132f231-6fbd-48b7-8d80-36e715f1d1f0"
  },
  {
    chatId: "eb5ec184-9927-487e-aaec-935feca2631a",
    createdAt: "2022-11-17T16:22:09.000Z",
    id: "35df0b26-608e-47a6-a5f0-066aa4615a4r",
    text: "Hola",
    updatedAt: "2022-11-17T16:22:09.000Z",
    userId: "e132f231-6fbd-48b7-8d80-36e715f1d1f0"
  }
];

export const messagesFormattedMock = [
  {
    chatId: "eb5ec184-9927-487e-aaec-935feca2631a",
    createdAt: "2022-11-18T16:22:09.000Z",
    id: "35df0b26-608e-47a6-a5f0-066aa4615a4e",
    text: "Hello",
    updatedAt: "2022-11-18T16:22:09.000Z",
    userId: "e132f231-6fbd-48b7-8d80-36e715f1d1f0",
    formattedDate: "18/11 18:22"
  },
  {
    chatId: "eb5ec184-9927-487e-aaec-935feca2631a",
    createdAt: "2022-11-17T16:22:09.000Z",
    id: "35df0b26-608e-47a6-a5f0-066aa4615a4r",
    text: "Hola",
    updatedAt: "2022-11-17T16:22:09.000Z",
    userId: "e132f231-6fbd-48b7-8d80-36e715f1d1f0",
    formattedDate: "17/11 18:22"
  }
];


