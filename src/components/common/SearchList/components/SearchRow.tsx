import React, {FC, memo, useMemo} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Thumbnail from 'components/common/Thumbnail';
import MyTheme from 'src/config/theme';
import {UserSearch} from 'src/types/user';
import Button from 'components/common/Button';
import {EStatusFriend} from 'src/config/user.const';
import IconButton from 'components/common/Button/IconButton';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

interface SearchRowListProps {
  user: UserSearch;
}

const SearchRow: FC<SearchRowListProps> = ({user}) => {
  const status = useMemo(() => {
    if (user.statusFriend) {
      if (user.statusFriend === EStatusFriend.ACCEPTED) {
        return (
          <IconButton
            size="smaller"
            style={{backgroundColor: '#20d080'}}
            rounded
            icon={<FontAwesomeIcon icon="check" size={20} color="#fff" />}
          />
        );
      } else {
        return (
          <Button
            style={{backgroundColor: '#ff9500'}}
            text="Pendiente"
            size="small"
          />
        );
      }
    } else {
      return <Button text="Agregar" size="small" />;
    }
  }, []);

  return (
    <View style={styles.itemContainer}>
      <View style={styles.left}>
        <Thumbnail uri={user.urlImageProfile} width={52} />
        <Text style={styles.username}>{user.username.toLowerCase()}</Text>
      </View>
      <View>{status}</View>
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
});

export default memo(SearchRow);
