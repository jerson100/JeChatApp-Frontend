import React, {FC, memo, useCallback} from 'react';
import {UserSearch} from 'src/types/user';
import UserFriend from 'components/common/UserFriend/UserFriend';
import useChangeStatusFriend from 'src/hooks/useChangeStatusFriend';
import {EStatusFriend} from 'src/config/user.const';
import useSearchUserStore from 'src/stores/SearchUserStore';

interface SearchRowListProps {
  userSearch: UserSearch;
}

const SearchRow: FC<SearchRowListProps> = ({userSearch}) => {
  const {loading, changeStatus: changeStatusApi} = useChangeStatusFriend(
    userSearch._id,
    userSearch.friend?._id,
  );
  const changeStatus = useSearchUserStore(state => state.changeStatus);

  const _onChangePress = useCallback(
    async (status: EStatusFriend) => {
      try {
        const friend = await changeStatusApi(status);
        if (friend) {
          changeStatus(friend);
        }
      } catch (e) {}
    },
    [changeStatus, changeStatusApi],
  );

  return (
    <UserFriend
      loading={loading}
      email={userSearch.email}
      username={userSearch.username}
      urlImageProfile={userSearch.urlImageProfile}
      createdAt={userSearch.createdAt}
      onButtonPress={_onChangePress}
      friend={userSearch.friend}
    />
  );
};

export default memo(SearchRow);
