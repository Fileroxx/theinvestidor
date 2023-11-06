import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import App from './App';
import Login from './pages/Login';

const Router = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" Component={App} />
          <Route path="/register" Component={Register} />
          <Route path="/login" Component={Login} />
          {/* Adicione mais rotas aqui, se necessário */}
        </Routes>
    </BrowserRouter>

  );
};

export default Router;
