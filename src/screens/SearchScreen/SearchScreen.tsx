import React, {useRef, useMemo, useCallback, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import Content from './components/Content';
import useSearchUserStore from 'src/stores/SearchUserStore';

const SearchScreen = () => {
  const onEvents = useSearchUserStore(state => state.onEvents);
  const removeEvents = useSearchUserStore(state => state.removeEvents);

  const navigation = useNavigation();

  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ['75%', '100%'], []);

  // callbacks
  //   const handleSheetChanges = useCallback((index: number) => {
  //     console.log('handleSheetChanges', index);
  //   }, []);

  useEffect(() => {
    console.log('mounter search');
    onEvents();
    return () => {
      removeEvents();
      console.log('unmount search');
    };
  }, [removeEvents]);

  const goBack = () => {
    navigation.goBack();
  };

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        // opacity={0}
        pressBehavior="close"
      />
    ),
    [],
  );

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        backdropComponent={renderBackdrop}
        onClose={goBack}>
        <Content />
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

export default SearchScreen;
