import React from 'react';
import {FlatList} from 'react-native';
import useRequestStore from 'src/stores/RequestStore';
import EmptyRequestlist from './EmptyRequestlist';
import RequestItem from './RequestItem';
import {User} from 'src/types/user';

const RequestList = () => {
  const request = useRequestStore(state => state.request);
  return (
    <>
      {request.length === 0 ? (
        <EmptyRequestlist />
      ) : (
        <FlatList
          data={request}
          keyExtractor={item => item._id as string}
          renderItem={({item}) => {
            const senderUser = item.senderUserId as User;
            return (
              <RequestItem
                email={senderUser.email}
                username={senderUser.username}
                createdAt={senderUser.createdAt}
                friend={item}
                urlImageProfile={senderUser.urlImageProfile}
              />
            );
          }}
        />
      )}
    </>
  );
};

export default RequestList;
