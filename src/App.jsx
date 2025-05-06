import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import GlobalStyles from './styles/GlobalStyles';
import AppRoutes from './AppRoutes';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <GlobalStyles />
          <ToastContainer position="top-right" theme="dark" />
          <AppRoutes />
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;