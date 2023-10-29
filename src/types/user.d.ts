export interface User {
  _id?: string;
  username: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
  urlImageProfile?: string;
}

export type UserSearch = User & {
  statusFriend?: EStatusFriend;
};

export type UserAllResponse = {
  metadata: {
    totalItems: number;
    currentPage: number;
    itemsPerPage: number;
  };
  users: UserSearch[];
};
