import React, {useEffect} from 'react';
import {ScrollView} from 'react-native';
import RequestItemLoading from 'components/common/loadings/RequestItemLoading';
import useRequestStore from 'src/stores/RequestStore';
import {useShallow} from 'zustand/react/shallow';
import RequestListError from './components/RequestListError';
import RequestList from './components/RequestList';

const RequestsScreen = () => {
  const {onEvents, loading, error} = useRequestStore(
    useShallow(state => ({
      onEvents: state.onEvents,
      loading: state.loading,
      request: state.request,
      error: state.error,
    })),
  );
  useEffect(() => {
    onEvents();
  }, []);

  if (loading) return <RequestItemLoading />;
  if (error) return <RequestListError text={error} />;

  return <RequestList />;
};

export default RequestsScreen;
