import ResponseAxiosError from 'src/lib/ResponseAxiosError';
import UserService from 'src/services/UserService';
import {Friend} from 'src/types/friend';
import {UserSearch} from 'src/types/user';
import {create} from 'zustand';

interface SearchUserState {
  users: UserSearch[] | null;
  loading: boolean;
  error: string | null;
  page: number;
}

interface SearchUserActions {
  getUsers: (searchText: string, signal: AbortSignal) => Promise<void>;
  clearAll: () => void;
  changeStatus: (friend: Friend) => void;
}

const initialState: SearchUserState = {
  users: null,
  loading: false,
  error: null,
  page: 1,
};

const useSearchUserStore = create<SearchUserState & SearchUserActions>(
  (set, get) => ({
    ...initialState,
    getUsers: async (searchText, signal) => {
      set({loading: true, error: null});
      try {
        const allusers = await UserService.getAllSearchingUsers(searchText, {
          signal: signal,
        });
        const users = allusers.users;
        const page = allusers.metadata.currentPage;
        set({users, page, loading: false});
      } catch (error) {
        if (error instanceof ResponseAxiosError) {
          if (error.status !== 0) {
            set({error: error.message, loading: false});
          } else {
            console.log(error);
          }
        }
      }
    },
    clearAll: () => {
      set({users: null, loading: false, error: null, page: 1});
    },
    changeStatus: friend => {
      set(prev => {
        if (prev.users) {
          const index = prev.users.findIndex(
            user =>
              user.friend?._id === friend._id ||
              user._id === friend.senderUserId ||
              user._id === friend.receiverUserId,
          );
          if (index != -1) {
            const newUsers = [...prev.users];
            const us = newUsers[index];
            newUsers.splice(index, 1, {...us, friend: friend});
            return {users: newUsers};
          }
        }
        return prev;
      });
    },
  }),
);

export default useSearchUserStore;
