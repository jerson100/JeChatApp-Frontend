import ResponseAxiosError from 'src/lib/ResponseAxiosError';
import UserService from 'src/services/UserService';
import {Friend} from 'src/types/friend';
import {UserSearch, User} from 'src/types/user';
import useAuthStore from './AuthStore';
import {create} from 'zustand';

interface SearchUserState {
  users: UserSearch[] | null;
  searchText: string;
  loading: boolean;
  error: string | null;
  page: number;
}

interface SearchUserActions {
  getUsers: (searchText: string, signal: AbortSignal) => Promise<void>;
  clearAll: () => void;
  changeStatus: (friend: Friend) => void;
  setSearchText: (searchText: string) => void;
  clearSearch: () => void;
  onEvents: () => void;
  removeEvents: () => void;
}

const initialState: SearchUserState = {
  users: null,
  loading: false,
  error: null,
  page: 1,
  searchText: '',
};

const useSearchUserStore = create<SearchUserState & SearchUserActions>(
  (set, get) => ({
    ...initialState,
    onEvents: () => {
      const socket = useAuthStore.getState().socket;
      socket.on('stateChangeInSearch', friend => {
        set(state => {
          if (!state.users) return state;
          const index = state.users.findIndex(
            user =>
              user.friend?._id === friend._id ||
              user._id === (friend.senderUserId as User)._id ||
              user._id === (friend.receiverUserId as User)._id,
          );
          if (index !== -1) {
            const newUsers = [...state.users];
            const user = newUsers[index];
            const newUs = {
              ...user,
              friend: friend,
            };
            newUsers.splice(index, 1, newUs);
            return {users: newUsers};
          }
          return state;
        });
      });
    },
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
          const index = prev.users.findIndex((user: UserSearch) => {
            const senderUserId = friend.senderUserId as User;
            const receiverUserId = friend.receiverUserId as User;
            // console.log(senderUserId);
            return (
              user.friend?._id === friend._id ||
              user._id === senderUserId._id ||
              user._id === receiverUserId._id
            );
          });
          if (index != -1) {
            const newUsers = [...prev.users];
            const us = newUsers[index];
            const newUs = {...us, friend: friend};
            newUsers.splice(index, 1, newUs);
            useAuthStore
              .getState()
              .socket?.emit('changeStatusFriend', friend, us._id as string);
            return {users: newUsers};
          }
        }
        return prev;
      });
    },
    setSearchText: searchText => {
      set({searchText});
    },
    clearSearch: () => {
      set(initialState);
    },
    removeEvents: () => {
      const socket = useAuthStore.getState().socket;
      socket.off('stateChangeInSearch');
    },
  }),
);

export default useSearchUserStore;
