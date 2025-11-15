import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ToastContainer } from 'react-toastify';
import Dashboard from "./pages/Dashboard.jsx";

const App = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
          <ToastContainer />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
