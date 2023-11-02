import {Socket} from 'socket.io-client';
import {Friend} from './friend';
import {UserSearch} from './user';

export type Payload = {
  _id: string;
  username: string;
  email: string;
  urlImageProfile?: string;
};

export interface ServerToClientEvents {
  //   changeStatusFriend: (friend: Friend) => void;
  changeStatusFriend: (friend: Friend) => void;
}

export interface ClientToServerEvents {
  changeStatusFriend: (friend: Friend, toIdUser: string) => void;
  getRequest: (callback: (users: Friend[]) => void) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  user: Payload;
}

export type SocketIOClient = Socket<ServerToClientEvents, ClientToServerEvents>;
