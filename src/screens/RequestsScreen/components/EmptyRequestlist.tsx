import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import Information from 'components/common/Information';
import React from 'react';
import {View} from 'react-native';

const EmptyRequestlist = () => {
  return (
    <View>
      <Information
        text="No tienes solicitudes."
        icon={
          <FontAwesomeIcon
            icon="exclamation-triangle"
            size={60}
            color="#707070"
          />
        }
      />
    </View>
  );
};

export default EmptyRequestlist;
