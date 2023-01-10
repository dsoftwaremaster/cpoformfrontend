import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Menu from './app/menu/Menu';
import SignUpForm from './app/signup/SignUpForm';
import LoginForm from './app/login/LoginForm';
import Registro from './app/registro/Registro';
import 'semantic-ui-css/semantic.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <BrowserRouter basename='/apsoftindustries'>
    <Routes>
      <Route index path='/' element={<Menu />}>
      </Route>
      <Route path='/firma-electronica' element={<LoginForm />} />
      <Route path='/firma-electronica/signup' element={<SignUpForm />} />
      <Route path='/firma-electronica/registro' element={<Registro />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
