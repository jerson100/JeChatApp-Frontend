import React, {FC} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import Information from 'components/common/Information';

interface SearchErrorProps {
  text?: string;
}

const SearchError: FC<SearchErrorProps> = ({text}) => {
  return (
    <Information
      text={text || 'Ocurrió un error al buscar'}
      icon={
        <FontAwesomeIcon
          icon="exclamation-triangle"
          size={60}
          color="#707070"
        />
      }
    />
  );
};

export default SearchError;
