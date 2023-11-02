import React, {FC} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {UserSearch} from 'src/types/user';
import SearchRow from './components/SearchRow';
import {BottomSheetFlatList} from '@gorhom/bottom-sheet';

interface SearchListProps {
  data: UserSearch[];
}

const SearchList: FC<SearchListProps> = ({data}) => {
  return (
    <>
      <View style={styles.container}>
        {/* <Text>{JSON.stringify(data)}</Text> */}
        <BottomSheetFlatList
          style={styles.content}
          data={data}
          renderItem={item => (
            <SearchRow userSearch={item.item} key={item.index} />
          )}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});

export default SearchList;
