import { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Login, SignUp, UpdateUser, Users } from '../screens';
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
            <Route path='/users' component={Users} />
            <Route path='/updateUser/:id' component={UpdateUser} />
          </>
        ) : (
          <>
            <Route path='/'>
              <Redirect to='/login' />
            </Route>
            <Route path='/login' component={Login} />
            <Route path='/signup' component={SignUp} />
          </>
        )}
      </Switch>
    </BrowserRouter>
  );
}
