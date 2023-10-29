import ResponseAxiosError from 'src/lib/ResponseAxiosError';
import UserService from 'src/services/UserService';
import {UserSearch} from 'src/types/user';
import {create} from 'zustand';

interface SearchUserStore {
  users: UserSearch[] | null;
  loading: boolean;
  error: string | null;
  page: number;
  getUsers: (searchText: string, signal: AbortSignal) => Promise<void>;
  clearAll: () => void;
}

const useSearchUserStore = create<SearchUserStore>((set, get) => ({
  users: null,
  loading: false,
  error: null,
  page: 1,
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
}));

export default useSearchUserStore;
