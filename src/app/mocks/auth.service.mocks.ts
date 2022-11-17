import { FbStatusResponse, NewUserDto } from "../auth/auth.service";

export const fbStatusResponseMock: FbStatusResponse = {
  status: 'connected',
  authResponse: {
    accessToken: 'token',
    data_access_expiration_time: 1,
    expiresIn: 1,
    signedRequest: 'signedRequest',
    userID: 'userID'
  }
}

export const newUser: NewUserDto = {
  firstName: 'Natalia',
  lastName: 'Test',
  email: 'mail1@mail.com',
  password: 'password'
}