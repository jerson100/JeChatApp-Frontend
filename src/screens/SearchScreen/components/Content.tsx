import React, {useCallback, useMemo, useState} from 'react';
import {View, StyleSheet, Text, ListRenderItemInfo} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import Input from 'components/common/Input';
import {BottomSheetFlatList, BottomSheetScrollView} from '@gorhom/bottom-sheet';
import Information from 'components/common/Information';
import SearchResult from './SearchResult';

const Content = () => {
  const [searchText, setSearchText] = useState('');

  //   const renderItem = useCallback(
  //     (item: ListRenderItemInfo<string>) => (
  //       <View style={styles.itemContainer}>
  //         <Text>{item.item}</Text>
  //       </View>
  //     ),
  //     [],
  //   );
  return (
    <View style={styles.contentContainer}>
      <View style={styles.inputSearchContainer}>
        <Input
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Buscar"
          leftIcon={<FontAwesomeIcon icon="search" size={20} color="#707070" />}
        />
      </View>
      <BottomSheetScrollView style={styles.scrollContainer}>
        <SearchResult searchText={searchText} />
      </BottomSheetScrollView>

      {/* <BottomSheetFlatList
        data={data}
        keyExtractor={i => i}
        renderItem={renderItem}
        contentContainerStyle={styles.contentContainer}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    gap: 32,
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
