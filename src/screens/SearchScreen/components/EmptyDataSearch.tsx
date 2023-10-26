import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import Information from 'components/common/Information';
import React from 'react';

const EmptyDataSearch = () => {
  return (
    <Information
      icon={<FontAwesomeIcon icon="circle-info" size={60} color="#707070" />}
      centered
      text="No se encontraron resultados"
    />
  );
};

export default EmptyDataSearch;
