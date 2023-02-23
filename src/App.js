import { BrowserRouter, Route, Routes, Redirect } from 'react-router-dom';
import Menu from './app/pages/menu/Menu';
import SignUpForm from './app/pages/signup/SignUpForm';
import LoginForm from './app/pages/login/LoginForm';
import Registro from './app/pages/registro/Registro';
import 'semantic-ui-css/semantic.min.css';
import { useRecoilState } from 'recoil';
import { authState } from './app/recoil/auth';
import { useEffect } from 'react';

function App() {
  const [auth, setAuth] = useRecoilState(authState);
  useEffect(() => {
    console.log(auth);
  }, [])

  return (
    <BrowserRouter basename='/apsoftindustries'>
      <Routes>
        <Route index path='/' element={<Menu />}>
        </Route>
        <Route path='/firma-electronica' element={auth ? <Registro /> : <LoginForm />} />
        <Route path='/firma-electronica/signup' element={<SignUpForm />} />
        <Route path='/firma-electronica/registro' element={<Registro />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
