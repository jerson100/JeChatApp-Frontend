import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import Information from 'components/common/Information';
import React, {FC} from 'react';

type Props = {
  text?: string;
};

const RequestListError: FC<Props> = ({text}) => {
  return (
    <Information
      text={text || 'Ocurrió un error al cargar las solicitudes.'}
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

export default RequestListError;
