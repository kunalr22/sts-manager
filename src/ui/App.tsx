import { use, useEffect, useState } from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from './store/useAuthStore';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { Toaster } from 'react-hot-toast';

function App() {
  const { currentUser, checkCurrentUser } = useAuthStore();

  // const [dbName, setDbName] = useState<string | null>(null);
  // useEffect(() => {
  //   async function fetchDbName() {
  //     try {
  //       const res = await window.electron.getDbName();
  //       if (!res.status) {
  //         throw new Error(res.message);
  //       }
  //       setDbName(res.data);
  //     } catch (error) {
  //       console.error('Error fetching database name:', error);
  //     }
  //   }

  //   fetchDbName();
  // }, []);

  useEffect(() => {
    checkCurrentUser();
    console.log(currentUser)
  }, [checkCurrentUser]);

  return (
    <div>
      {/* <h1>Connected to: {dbName}</h1> */}
      <Routes>
        <Route path="/login" element={!currentUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/" element={currentUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/register" element={!currentUser ? <RegisterPage /> : <Navigate to="/" />} />
      </Routes>

      <Toaster />
    </div>
  )
}

export default App
