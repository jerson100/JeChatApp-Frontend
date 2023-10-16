import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import IconButton from 'components/common/Button/IconButton';
import React from 'react';
import {StyleSheet, TouchableOpacity, Image, View} from 'react-native';

const Profile = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <Image
        style={styles.image}
        source={require('../../../assets/images/logo-user.png')}
      />
      <View style={styles.contentImage}>
        <IconButton
          icon={<FontAwesomeIcon icon="camera" color="#fff" size={20} />}
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
