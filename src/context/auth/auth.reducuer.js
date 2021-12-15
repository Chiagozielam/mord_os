import { CREATE_NEW_ACCOUNT, CHECK_USER_SESSION, SIGN_IN, LOGOUT_USER } from '../types'
import { checkForStoredUser, saveNewUser, safeguardUser, signInUser } from './auth.utils';

const AuthReducer = (prevState, { type, payload }) => {
  switch (type) {
    case CHECK_USER_SESSION: {
      const users = prevState.users || checkForStoredUser();
      return { ...prevState, users: safeguardUser(users) };
    }

    case CREATE_NEW_ACCOUNT: {
      const newUsers = saveNewUser(payload);
      return { ...prevState, users: safeguardUser(newUsers) };
    }

    case SIGN_IN: {
      const { userIndex, password } = payload;
      const signInSuccess = signInUser(userIndex, password);
      if (signInSuccess) {
        return { ...prevState, activeUser: prevState.users[userIndex], success: true };
      }
      return { ...prevState, error: { text: "the password you entered is incorrect", __id: new Date().getTime() } };
    }

    case LOGOUT_USER: {
      return { ...prevState, success: null, error: null, activeUser: null };
    }
    default:
      return prevState
  }
}

export default AuthReducer
