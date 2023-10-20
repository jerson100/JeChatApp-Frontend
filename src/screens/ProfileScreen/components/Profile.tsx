import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import IconButton from 'components/common/Button/IconButton';
import React from 'react';
import {StyleSheet, TouchableOpacity, Image, View} from 'react-native';
import ImagePicker, {Image as ImageI} from 'react-native-image-crop-picker';
import UserService from 'src/services/UserService';
import useAuthStore from 'src/stores/AuthStore';

const Profile = () => {
  const user = useAuthStore(state => state.auth?.user);
  const changeUrlImageProfile = useAuthStore(
    state => state.changeUrlImageProfile,
  );
  const changeImage = async () => {
    try {
      const image: ImageI = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
        includeBase64: true,
      });
      const response = await UserService.uploadProfileImage(
        {
          type: image.mime as string,
          uri: image.path as string,
          name: image.path.split('/').pop() as string,
        },
        user?._id as string,
      );
      changeUrlImageProfile(response);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <TouchableOpacity onPress={changeImage} style={styles.container}>
      <Image
        style={styles.image}
        source={
          user?.urlImageProfile
            ? {uri: user.urlImageProfile}
            : require('../../../assets/images/logo-user.png')
        }
        // source={require('../../../assets/images/logo-user.png')}
      />
      <View style={styles.contentImage}>
        <IconButton
          style={{borderWidth: 3, borderColor: '#fff'}}
          icon={<FontAwesomeIcon icon="camera" color="#fff" size={20} />}
          onPress={changeImage}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  contentImage: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  image: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#c0c0c0',
    marginTop: -90,
  },
});

export default Profile;
