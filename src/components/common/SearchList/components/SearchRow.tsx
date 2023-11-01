import React, {FC, memo} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Thumbnail from 'components/common/Thumbnail';
import MyTheme from 'src/config/theme';
import {UserSearch} from 'src/types/user';
import FriendStatus from './FriendStatus';
import {differenceInDays} from 'src/lib/date';

interface SearchRowListProps {
  userSearch: UserSearch;
}

const SearchRow: FC<SearchRowListProps> = ({userSearch}) => {
  const isNew = userSearch.createdAt
    ? differenceInDays(new Date(), new Date(userSearch.createdAt)) < 7
    : false;
  return (
    <View style={styles.itemContainer}>
      <View style={styles.left}>
        <Thumbnail uri={userSearch.urlImageProfile} width={52} isNew={isNew} />
        <View style={styles.detailscontainer}>
          <Text style={styles.username}>
            {userSearch.username.toLowerCase()}
          </Text>
          <Text style={styles.email}>{userSearch.email.toLowerCase()}</Text>
        </View>
      </View>
      <View>
        <FriendStatus
          friend={userSearch.friend}
          idUser={userSearch._id || ''}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    gap: 16,
    padding: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    justifyContent: 'space-between',
    borderBottomColor: MyTheme.colors.border,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    color: MyTheme.colors.text,
  },
  detailscontainer: {
    gap: 2,
  },
  email: {
    fontSize: 14,
    color: '#8e8e93',
  },
});

export default memo(SearchRow);
