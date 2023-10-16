import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import Button from 'components/common/Button';
import React, {useEffect} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import EncryptedSecureStorage from 'src/config/encryptedStorage';
import useAuthStore from 'src/stores/AuthStore';
import Profile from './components/Profile';

const ProfileScreen = () => {
  const logout = useAuthStore(state => state.logout);
  const auth = useAuthStore(state => state.auth);
  useEffect(() => {
    (async () => {
      const rsp = await EncryptedSecureStorage.getItem('AUTH_TOKEN');
    })();
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={styles.banner}
        // source={require('../../assets/images/bgForm2.png')}
      />
      <Profile />
      <Text style={styles.username}>{auth?.user.username}</Text>
      <Button
        leftIcon={
          <FontAwesomeIcon
            icon="sign-out-alt"
            color="#fff"
            size={20}
            style={{marginRight: 12}}
          />
        }
        text="Cerrar Sesión"
        onPress={logout}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  banner: {
    backgroundColor: '#202020',
    width: '100%',
    height: 180,
  },

  textButton: {
    color: '#fff',
  },
  username: {
    fontWeight: 'bold',
    fontSize: 25,
    color: '#202020',
    marginBottom: 40,
  },
});

export default ProfileScreen;
