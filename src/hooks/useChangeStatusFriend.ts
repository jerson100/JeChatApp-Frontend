import {useMemo, useState, useCallback} from 'react';
import {EStatusFriend} from 'src/config/user.const';
import ResponseAxiosError from 'src/lib/ResponseAxiosError';
import FriendService from 'src/services/friendService';
import {Friend} from 'src/types/friend';

export default function useChangeStatusFriend(
  idUser: string,
  idFriend?: string,
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const changeStatus = useCallback(
    async (status: EStatusFriend): Promise<Friend | null> => {
      setLoading(true);
      setError(null);
      try {
        if (EStatusFriend.SEND === status) {
          return await FriendService.createFriend(idUser);
        } else if (EStatusFriend.ACCEPT === status && idFriend) {
          return await FriendService.patchFriend(idFriend);
        }
      } catch (error) {
        if (error instanceof ResponseAxiosError) {
          if (error.status !== 0) {
            console.log(error.message);
            setError(error.message);
            throw error;
          } else {
            console.log(error);
          }
        }
      } finally {
        setLoading(false);
      }
      return null;
    },
    [idFriend, idUser],
  );

  return useMemo(() => {
    return {
      loading,
      error,
      changeStatus,
    };
  }, [loading, error, changeStatus]);
}
