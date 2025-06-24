import { use, useEffect, useState } from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from './store/useAuthStore';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { Toaster } from 'react-hot-toast';
import { Loader } from 'lucide-react';

function App() {
  const { currentUser, checkCurrentUser, checkingAuthentication } = useAuthStore();

  useEffect(() => {
    checkCurrentUser();
  }, [checkCurrentUser]);

  console.log("Current User:", currentUser);
  console.log("Checking Authentication:", checkingAuthentication);
  console.log("------");

  if (checkingAuthentication && !currentUser) return (
    <div className="flex items-center justify-center h-screen">
      <Loader className="size-10 animate-spin" />
    </div>
  );

  return (
    <div>
      {/* <h1>Connected to: {dbName}</h1> */}
      <Routes>
        <Route path="/" element={currentUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/register" element={!currentUser ? <RegisterPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!currentUser ? <LoginPage /> : <Navigate to="/" />} />
      </Routes>

      <Toaster />
    </div>
  )
}

export default App
