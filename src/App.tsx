import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from 'styled-components';
import Router from './routes';
import GlobalStyle from './utils/globalStyle';
import { defaultTheme } from './utils/theme';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyle />
        <ToastContainer />
        <Router />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
