import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import Information from 'components/common/Information';
import React from 'react';

const EmptyTextSearch = () => {
  return (
    <Information
      icon={
        <FontAwesomeIcon icon="magnifying-glass" size={60} color="#707070" />
      }
      centered
      text="Ingresa un nombre de usuario"
    />
  );
};

export default EmptyTextSearch;
