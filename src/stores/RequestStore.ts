import {create} from 'zustand';
import useAuthStore from './AuthStore';
import {Friend} from 'src/types/friend';

interface RequestState {
  request: Friend[];
  loading: boolean;
  error: string | null;

  //   acceptRequestLoading: boolean;
  //   acceptRequestError: string | null;
}

interface RequestActions {
  onEvents: () => void;
  clearAll: () => void;
  acceptRequest: (
    friend: Friend,
    callback?: (error?: string) => void,
  ) => Promise<void>;
}

const initialState: RequestState = {
  request: [],
  loading: false,
  error: null,
  //   acceptRequestLoading: false,
  //   acceptRequestError: null,
};

const useRequestStore = create<RequestState & RequestActions>((set, get) => ({
  ...initialState,
  onEvents: () => {
    const socket = useAuthStore.getState().socket;
    set({loading: true});
    socket.emit('getRequest', requests => {
      set({request: requests, loading: false});
    });
    socket.on('changeStatusFriend', request => {
      set(state => {
        const prev = state.request || [];
        const index = prev.findIndex(req => req._id === request._id);
        let newRequests = [...prev];
        if (index !== -1) {
          if (request.connected) {
            newRequests.splice(index, 1);
          } else {
            const req = newRequests[index];
            newRequests.splice(index, 1, {...req, ...request});
          }
        } else {
          newRequests = [request, ...newRequests];
        }
        return {request: newRequests};
      });
    });
    socket.on('removeRequest', idRequest => {
      set(state => {
        if (!state.request) return state;
        const prev = state.request;
        const index = prev.findIndex(req => req._id == idRequest);
        let newRequests = [...prev];
        if (index !== -1) {
          newRequests.splice(index, 1);
          return {request: newRequests};
        }
        return state;
      });
    });
  },
  acceptRequest: async (friend: Friend) => {
    const socket = useAuthStore.getState().socket;
    // console.log(friend);
    // set({acceptRequestLoading: true, acceptRequestError: null});
    socket.emit('acceptRequest', friend, error => {
      if (!error) {
        // set({acceptRequestError: error});
        return Promise.resolve();
      } else {
        return Promise.reject(error);
        // set({acceptRequestError: null});
      }
    });
  },
  clearAll: () => {
    //remove all event socket
    // const socket = useAuthStore.getState().socket;
    // socket.off('changeStatusFriend');
    // socket.off('removeRequest');
    set({
      request: [],
      loading: false,
      error: null,
      //   acceptRequestLoading: false,
      //   acceptRequestError: null,
    });
  },
}));

export default useRequestStore;
