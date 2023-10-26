import React, {FC} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {User} from 'src/types/user';

interface SearchListProps {
  data: User[];
}

const SearchList: FC<SearchListProps> = ({data}) => {
  return (
    <>
      <View style={{gap: 16, marginBottom: 16}}>
        {data.map((item, index) => {
          return (
            <View key={index} style={styles.itemContainer}>
              <Text>{item.username}</Text>
            </View>
          );
        })}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  itemContainer: {},
});

export default SearchList;
