import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './views/Home'
import Login from './views/Auth/Login'
import Register from './views/Auth/Register'
import Dashboard from './views/Auth/Dashboard'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App