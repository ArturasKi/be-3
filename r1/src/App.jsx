import './bootstrap.css';
import './App.scss';
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react';
import { login, logout, authConfig } from './Functions/auth';
import axios from 'axios';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Back from "./Components/Back/Back"; 
import Front from "./Components/Front/Front"; 

function App() {
    
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<RequireAuth role="user" ><Front show="clothes" /></RequireAuth>} />
          <Route path="/cart" element={<RequireAuth role="user"><Front show="cart"/></RequireAuth>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logout" element={<LogoutPage />} />
          <Route path="/admin" element={<RequireAuth role="admin"><Back show="clothes"/></RequireAuth>} />
          {/* <Route path="/admin/cats" element={<RequireAuth role="admin"><Back show="cats"/></RequireAuth>} />
          <Route path="/admin/products" element={<RequireAuth role="admin"><Back show="products"/></RequireAuth>} />
          <Route path="/admin/comments" element={<RequireAuth role="admin"><Back show="com"/></RequireAuth>} /> */}
      </Routes>
    </BrowserRouter>
  );
}

function RequireAuth({ children, role }) {
  const [view, setView] = useState(<h2>Please wait...</h2>);
  
  useEffect(() => {
    axios.get('http://localhost:3003/login-check?role=' + role, authConfig())
      .then(res => {
        if ('ok' === res.data.msg) {
        localStorage.setItem('user', JSON.stringify(res.data.result))
          setView(children);
        } else {
          setView(<Navigate to="/login" replace />);
        }
      })
  }, [children, role]);
  return view;
}     

function LoginPage() {
  const navigate = useNavigate();

  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  const doLogin = () => {
    axios.post('http://localhost:3003/login', { user, pass })
      .then(res => {
        console.log(res.data);
        if ('ok' === res.data.msg) {
          login(res.data.key);
          navigate('/', { replace: true });
        }
      })
  }
  return (
    <div className='container col-3'>
      <div className='row mt-4'>
        <div className='card login'>
          <div className='card-body'>
            <div className='form-group'>name: <input type="text" value={user} onChange={e => setUser(e.target.value)}></input></div>
            <div className='form-group'>password: <input type="password" value={pass} onChange={e => setPass(e.target.value)}></input></div>
            <button className="btn btn-outline-primary" onClick={doLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function LogoutPage() {
  useEffect(() => logout(), []);
  return (
    <Navigate to="/login" replace />
  )
}

export default App;