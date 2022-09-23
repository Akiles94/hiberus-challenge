import { createBrowserRouter } from 'react-router-dom';
import { Login } from '../screens';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
]);

export default router;
