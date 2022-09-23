import { useState } from 'react';
import Login from '../Login';
import SignUp from '../Signup';

export default function Auth() {
  const [switchAuth, setSwitchAuth] = useState<boolean>(true);
  return switchAuth ? <Login setSwitch={setSwitchAuth} /> : <SignUp setSwitch={setSwitchAuth} />;
}
