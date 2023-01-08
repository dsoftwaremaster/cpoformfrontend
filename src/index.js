import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Menu from './app/menu/Menu';
import IndexLogin from './app/login/IndexLogin';
import SignUpForm from './app/signup/SignUpForm';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <BrowserRouter basename='/apsoftindustries'>
    <Routes>
      <Route index path='/' element={<Menu />}>
      </Route>
      <Route path='/firma-electronica' element={<IndexLogin />} />
      <Route path='/firma-electronica/signup' element={<SignUpForm />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
