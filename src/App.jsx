// Core dependencies for routing and notifications
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Context providers for authentication and theme
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

// Global styles and routing configuration
import GlobalStyles from './styles/GlobalStyles';
import AppRoutes from './AppRoutes';

/**
 * Main App component that sets up the application's core providers and structure
 * - Router for navigation
 * - Auth context for user authentication state
 * - Theme context for dark/light mode
 * - Global styles for consistent styling
 * - Toast notifications for user feedback
 */
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