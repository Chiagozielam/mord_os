import { useEffect } from 'react';
import { Switch, Route, useLocation, Redirect } from 'react-router-dom';
import { useGeneralContext } from './context/useGeneralContext'

import SwitchUser from './pages/SwitchUser/SwitchUser';
import BootScreen from './pages/BootScreen/BootScreen';
import NewAccount from './pages/NewAccount/NewAccount';
import './App.scss';
import Desktop from './pages/Desktop/Desktop';

const App = () => {
  const {
    authState: { users, activeUser, success, error },
    checkUserSession
  } = useGeneralContext()
  const location = useLocation();
  useEffect(() => setTimeout(() => checkUserSession(), 2000), []);

  return (
    <div className="App">
      <Switch location={location} key={location.pathname}>
        <Route
          exact
          path="/"
          render={() =>
            users ? (
              users.length ? (
                <Redirect to="/switchuser" />
              ) : (
                <Redirect to="/newaccount" />
              )
            ) : (
              <BootScreen />
            )
          }
        />

        <Route
          path="/switchuser"
          render={() =>
            users ? (
              users.length ? (
                <SwitchUser users={users} />
              ) : (
                <Redirect to="/newaccount" />
              )
            ) : (
              <Redirect to="/" />
            )
          }
        />

        <Route path="/newaccount" render={() => (users ? <NewAccount /> : <Redirect to="/" />)} />

        <Route
          path="/desktop"
          render={() => (activeUser ? <Desktop activeUser={activeUser} /> : <Redirect to="/" />)}
        />
      </Switch>
    </div>
  );
};

export default App;
