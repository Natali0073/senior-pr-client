import { User, ChatListDTO, Chat } from "../home/home.service";

export const currentUserMock: User = {
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

export const chatsMock: Chat[] = [
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

export const chatsListMock: ChatListDTO = {
  currentPage: 0,
  totalItems: 2,
  totalPages: 1,
  chats: chatsMock
}
