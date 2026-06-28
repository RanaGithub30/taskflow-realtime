import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './views/Home'
import Login from './views/Auth/Login'
import Register from './views/Auth/Register'
import Dashboard from './views/Auth/Dashboard'
import Tasks from './views/Auth/Tasks'
import Projects from './views/Projects/Projects'
import Timer from './views/Auth/Timer'
import Bugs from './views/Auth/Bugs'
import Team from './views/Team/Team'
import Reports from './views/Reports/Reports'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/timer" element={<Timer />} />
        <Route path="/bugs" element={<Bugs />} />
        <Route path="/team" element={<Team />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App