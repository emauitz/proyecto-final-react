import { TaskProvider }  from './context/Taskcontext';
import { AuthProvider } from './context/AuthContext';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';  
import App from './App.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <TaskProvider>
        <App />
      </TaskProvider>
    </AuthProvider>
    
  </StrictMode>,
);

