import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { useGeneralContext } from '../../context/useGeneralContext';
import LoginView from './LoginView';
import './SwitchUser.scss';

const SwitchUser = ({ users }) => {
  const history = useHistory();
  const { authState: { success, error }, signInUser } = useGeneralContext()

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        history.push('/desktop');
      }, 2000);
    }
  }, [success]);

  const onLogin = (userIndex, password) => {
    signInUser(userIndex, password)
  };

  return (
    <>
        <LoginView
          users={users}
          onLogin={onLogin}
          authError={error}
          authSuccess={success}
          background="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9IOSqbFx8FsUIHfn-02xALZfbVTX7ccBFCQ&usqp=CAU"
        />
    </>
  );
};

export default SwitchUser;
