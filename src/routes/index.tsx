import { createBrowserRouter } from 'react-router-dom';
import Auth from '../screens/Auth';
import Users from '../screens/Users';
import { getToken } from '../utils/authStore';

const token = getToken();

const router = createBrowserRouter(
  token
    ? [
        {
          path: '/',
          element: <Users />,
        },
      ]
    : [
        {
          path: '/',
          element: <Auth />,
        },
      ]
);

export default router;
