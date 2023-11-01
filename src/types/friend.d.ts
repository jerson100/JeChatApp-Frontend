import {EStatusFriend} from 'src/config/user.const';

export interface Friend {
  _id?: string;
  senderUserId: string | User;
  receiverUserId: string | User;
  connected?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
