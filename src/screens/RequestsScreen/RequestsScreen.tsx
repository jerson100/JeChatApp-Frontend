import React, {useEffect} from 'react';
import {Text, View, ScrollView} from 'react-native';
import useRequestStore from 'src/stores/RequestStore';
import {useShallow} from 'zustand/react/shallow';

const RequestsScreen = () => {
  const {onEvents, loading, request} = useRequestStore(
    useShallow(state => ({
      onEvents: state.onEvents,
      loading: state.loading,
      request: state.request,
    })),
  );
  useEffect(() => {
    onEvents();
  }, []);
  return (
    <View>
      <ScrollView>
        <Text>RequestsScreen</Text>
        <Text>{loading ? 'true' : 'false'}</Text>
        <Text>{JSON.stringify(request, null, 2)}</Text>
      </ScrollView>
    </View>
  );
};

export default RequestsScreen;
