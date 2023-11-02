import {create} from 'zustand';
import useAuthStore from './AuthStore';
import {Friend} from 'src/types/friend';

interface RequestState {
  request: Friend[] | null;
  loading: boolean;
  error: string | null;
}

interface RequestActions {
  onEvents: () => void;
  clearAll: () => void;
}

const initialState: RequestState = {
  request: null,
  loading: false,
  error: null,
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
      //   console.log(request);
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
    // socket.on('changeStatusFriend', friend => {
    //   set(prev => {
    //     if (prev.users) {
    //       const index = prev.users.findIndex(
    //         user => user.friend?._id === friend._id,
    //       );
    //       if (index !== -1) {
    //         const newUsers = [...prev.users];
    //         const us = newUsers[index];
    //         newUsers.splice(index, 1, {...us, friend: friend});
    //         return {users: newUsers};
    //       } else {
    //       }
    //     }
    //     return prev;
    //   });
    // });
  },
  clearAll: () => {
    //remove all event socket
    // const socket = useAuthStore.getState().socket;
    set({request: null, loading: false, error: null});
  },
}));

export default useRequestStore;
