import ResponseAxiosError from 'src/lib/ResponseAxiosError';
import UserService from 'src/services/UserService';
import {User} from 'src/types/user';
import {create} from 'zustand';

interface SearchUserStore {
  users: User[];
  loading: boolean;
  error: string | null;
  getUsers: (searchText: string) => Promise<void>;
  abortController?: AbortController;
  clearAll: () => void;
}

const useSearchUserStore = create<SearchUserStore>((set, get) => ({
  users: [],
  loading: false,
  error: null,
  getUsers: async searchText => {
    set({loading: true, error: null});
    const abortController = get().abortController;
    if (abortController) {
      abortController.abort();
    }
    const newAbortController = new AbortController();
    set({abortController});
    try {
      const users = await UserService.getAllSearchingUsers(searchText, {
        signal: newAbortController.signal,
      });
      set({users});
    } catch (error) {
      console.log(error);
      if (error instanceof ResponseAxiosError) {
        if (error.status !== 0) {
          set({error: error.message});
        }
      }
    } finally {
      set({
        abortController: undefined,
        loading: false,
      });
    }
  },
  clearAll: () => {
    set({users: [], loading: false, error: null});
  },
}));

export default useSearchUserStore;
