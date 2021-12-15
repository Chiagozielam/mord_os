import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { VscArrowLeft } from 'react-icons/vsc';

import { getUsername, User } from '../../context/auth/auth.user';
import { useGeneralContext } from '../../context/useGeneralContext';
import ChildView from './ChildView';
import './NewAccount.scss';

const details = [
  {
    title: "Who are you?",
    subtitle: "Tell me your name",
    type: 'text',
    placeholder: 'User name',
  },
  {
    title: "Enter a password",
    subtitle: " ",
    type: 'password',
    placeholder: 'Password',
  },
];

const NewAccount = () => {
  const { authState: { users }, createNewAccount } = useGeneralContext()
  const history = useHistory();

  const [profileName, updateName] = useState('');
  const [profilePassword, updatePassword] = useState('');
  const [currentView, updateCurrentView] = useState(true);

  useEffect(() => {
    if (currentView === -1) {
      createNewAccount(User(profileName, profileName, profilePassword))
      setTimeout(() => history.push('/switchuser?cover=false'), 2000);
    }
  }, [currentView]);

  return (
    <div className="NewAccount">
      <div className="view-header">
        <div>
          {!currentView && <VscArrowLeft onClick={() => updateCurrentView(!currentView)} />}
        </div>
        <div className="view-header-title">Account</div>
        <div />
      </div>

      <div className="view-content">
        {currentView === -1 ? (
          <ChildView childClass="AccountSettingUpView" />
        ) : (
          <ChildView
            childClass={currentView ? 'AccountNameView' : 'AccountPasswordView'}
            onFieldUpdate={currentView ? updateName : updatePassword}
            value={currentView ? profileName : profilePassword}
            signInOpt={currentView ? users.length > 0 : false}
            onSubmit={() => (currentView ? updateCurrentView(!currentView) : updateCurrentView(-1))}
            details={details[+!currentView]}
            validity={(val) =>
              currentView ? users.filter((user) => getUsername(user) === val).length !== 0 : false
            }
          />
        )}
      </div>
    </div>
  );
};

export default NewAccount;
