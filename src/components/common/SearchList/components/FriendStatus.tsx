import React, {FC, memo} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import Button from 'components/common/Button';
import IconButton from 'components/common/Button/IconButton';
import {EStatusFriend} from 'src/config/user.const';
// import useSearchUserStore from 'src/stores/SearchUserStore';
// import useChangeStatusFriend from 'src/hooks/useChangeStatusFriend';
import {Friend} from 'src/types/friend';
import useAuthStore from 'src/stores/AuthStore';

interface FriendStatusProps {
  friend?: Friend;
  //   idUser: string;
  loading?: boolean;
  onButtonPress: (status: EStatusFriend) => Promise<void>;
}

const FriendStatus: FC<FriendStatusProps> = ({
  friend,
  //   idUser,
  loading = false,
  onButtonPress,
}) => {
  //   const changeStatus = useSearchUserStore(state => state.changeStatus);
  const idUserSession = useAuthStore(state => state.auth?.user?._id);
  //   const {loading, changeStatus: changeStatusApi} = useChangeStatusFriend(
  //     idUser,
  //     friend?._id,
  //   );
  if (friend) {
    if (friend.connected) {
      return (
        <IconButton
          size="smaller"
          style={{backgroundColor: '#20d080'}}
          disabled
          rounded
          icon={<FontAwesomeIcon icon="check" size={20} color="#fff" />}
        />
      );
    } else {
      if (typeof friend.senderUserId == 'object') {
        if (friend.senderUserId._id === idUserSession) {
          return (
            <Button
              style={{backgroundColor: '#ff9500'}}
              disabled
              text="Pendiente"
              size="smaller"
            />
          );
        } else {
          return (
            <Button
              text="Aceptar"
              size="smaller"
              style={{
                backgroundColor: '#2078d0',
              }}
              loading={loading}
              onPress={() => onButtonPress(EStatusFriend.ACCEPT)}
              //   onPress={async () => {
              //     try {
              //       const friend = await changeStatusApi(EStatusFriend.ACCEPT);
              //       if (friend) changeStatus(friend);
              //     } catch (e) {
              //       //   console.log(e);
              //     }
              //   }}
            />
          );
        }
      }
    }
  } else {
    return (
      <Button
        text="Conectar"
        size="smaller"
        loading={loading}
        // onPress={async () => {
        //   try {
        //     const friend = await changeStatusApi(EStatusFriend.SEND);
        //     if (friend) changeStatus(friend);
        //   } catch (e) {
        //     //   console.log(e);
        //   }
        // }}
        onPress={() => onButtonPress(EStatusFriend.SEND)}
      />
    );
  }
};

export default memo(FriendStatus);
