import {Friend} from './friend';

export interface User {
  _id?: string;
  username: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
  urlImageProfile?: string;
}

export type UserSearch = User & {
  friend?: Friend;
  loading?: boolean;
};

export type UserAllResponse = {
  metadata: {
    totalItems: number;
    currentPage: number;
    itemsPerPage: number;
  };
  users: UserSearch[];
};
