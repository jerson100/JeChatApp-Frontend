import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import Input from 'components/common/Input';
import SearchResult from './SearchResult';
import useSearchUserStore from 'src/stores/SearchUserStore';

const Content = () => {
  const searchText = useSearchUserStore(state => state.searchText);
  const setSearchText = useSearchUserStore(state => state.setSearchText);
  return (
    <View style={styles.contentContainer}>
      <View style={styles.inputSearchContainer}>
        <Input
          value={searchText}
          onChangeText={e => setSearchText(e)}
          placeholder="Buscar"
          leftIcon={<FontAwesomeIcon icon="search" size={20} color="#707070" />}
        />
      </View>
      <SearchResult />
      {/* {Array.from({length: 50}).map((_, index) => (
          <View key={index} style={styles.itemContainer}>
            <Text>{index}</Text>
          </View>
        ))} */}
      {/* </ScrollView> */}
      {/* <BottomSheetScrollView style={styles.scrollContainer}> */}
      {/* <Text>d</Text> */}
      {/* <SearchResult searchText={searchText} /> */}
      {/* </BottomSheetScrollView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    gap: 16,
    flexGrow: 1,
  },
  itemContainer: {
    height: 20,
    backgroundColor: '#eee',
  },
  inputSearchContainer: {
    paddingHorizontal: 16,
  },
  scrollContainer: {
    paddingHorizontal: 16,
  },
});

export default Content;
