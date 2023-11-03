import UserFriend from 'components/common/UserFriend/UserFriend';
import React, {FC, useCallback, useState} from 'react';
import {Friend} from 'src/types/friend';
import {EStatusFriend} from 'src/config/user.const';
import useRequestStore from 'src/stores/RequestStore';

interface RequestItemProps {
  username: string;
  email: string;
  urlImageProfile?: string;
  createdAt?: string;
  friend?: Friend;
}

const RequestItem: FC<RequestItemProps> = ({
  email,
  username,
  createdAt,
  friend,
  urlImageProfile,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const acceptRequest = useRequestStore(state => state.acceptRequest);
  const _onChangePress = useCallback(
    async (status: EStatusFriend) => {
      if (status === EStatusFriend.ACCEPT) {
        setLoading(true);
        try {
          await acceptRequest(friend as Friend);
          return Promise.resolve();
        } catch (e) {
          if (typeof e === 'string') {
            setError(e);
          }
        } finally {
          setLoading(false);
        }
      }
    },
    [acceptRequest],
  );
  console.log(error);
  return (
    <UserFriend
      loading={loading}
      email={email}
      username={username}
      urlImageProfile={urlImageProfile}
      createdAt={createdAt}
      onButtonPress={_onChangePress}
      friend={friend}
    />
  );
};

export default RequestItem;
