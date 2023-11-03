import React, {FC} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Thumbnail from '../Thumbnail';
import {Friend} from 'src/types/friend';
import {differenceInDays} from 'src/lib/date';
import FriendStatus from '../SearchList/components/FriendStatus';
import MyTheme from 'src/config/theme';
import {EStatusFriend} from 'src/config/user.const';

interface UserFriendProps {
  loading?: boolean;
  username: string;
  urlImageProfile?: string;
  friend?: Friend;
  email: string;
  createdAt?: string;
  onButtonPress: (status: EStatusFriend) => Promise<void>;
}

const UserFriend: FC<UserFriendProps> = ({
  username,
  urlImageProfile,
  friend,
  email,
  createdAt,
  onButtonPress,
  loading = false,
}) => {
  const isNew = createdAt
    ? differenceInDays(new Date(), new Date(createdAt)) < 7
    : false;
  return (
    <View style={styles.itemContainer}>
      <View style={styles.left}>
        <Thumbnail uri={urlImageProfile} width={52} isNew={isNew} />
        <View style={styles.detailscontainer}>
          <Text style={styles.username}>{username.toLowerCase()}</Text>
          <Text style={styles.email}>{email.toLowerCase()}</Text>
        </View>
      </View>
      <View>
        <FriendStatus
          loading={loading}
          friend={friend}
          onButtonPress={onButtonPress}
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

export default UserFriend;
