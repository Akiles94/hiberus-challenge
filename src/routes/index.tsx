import { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Login } from '../screens';
import SignUp from '../screens/Signup';
import UpdateUser from '../screens/UpdateUser';
import Users from '../screens/Users';
import { getToken } from '../utils/authStore';

export default function Router() {
  const [isToken, setIsToken] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    window.addEventListener('storage', () => {
      const token = getToken();
      if (token) {
        setIsToken(true);
      } else {
        setIsToken(false);
      }
    });
  });

  return (
    <BrowserRouter>
      <Switch>
        {isToken ? (
          <>
            <Route path='/'>
              <Redirect to='/users' />
            </Route>
            <Route path='/users'>
              <Users />
            </Route>
            <Route path='/updateUser/:id'>
              <UpdateUser />
            </Route>
          </>
        ) : (
          <>
            <Route path='/'>
              <Redirect to='/login' />
            </Route>
            <Route path='/login'>
              <Login />
            </Route>
            <Route path='/signup'>
              <SignUp />
            </Route>
          </>
        )}
      </Switch>
    </BrowserRouter>
  );
}
