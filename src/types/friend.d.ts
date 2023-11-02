import {EStatusFriend} from 'src/config/user.const';
import {User} from 'src/types/user';

export interface Friend {
  _id?: string;
  senderUserId: string | Omit<User, 'password'>;
  receiverUserId: string | Omit<User, 'password'>;
  connected?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
