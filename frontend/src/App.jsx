import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import Home from './views/Home'
import Login from './views/Auth/Login'
import Register from './views/Auth/Register'
import Dashboard from './views/Auth/Dashboard'
import Tasks from './views/Tasks/Tasks'
import Projects from './views/Projects/Projects'
import Timer from './views/Timer/Timer'
import Bugs from './views/Auth/Bugs'
import Team from './views/Team/Team'
import Reports from './views/Reports/Reports'
import NotFound from './views/NotFound'
import './App.css'

function ProtectedRoute({ children }) {
  const location = useLocation()
  const token = localStorage.getItem('authToken') || localStorage.getItem('access_token')

  if (token) {
    return children
  }

  const next = `${location.pathname}${location.search}${location.hash}`
  return (
    <Navigate
      to={`/login?next=${encodeURIComponent(next)}`}
      replace
      state={{
        message: {
          type: 'error',
          text: 'You should log in first to access that page.',
        },
      }}
    />
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/tasks" element={<ProtectedRoute><Tasks /></ProtectedRoute>} />
        <Route path="/projects" element={<ProtectedRoute><Projects /></ProtectedRoute>} />
        <Route path="/timer" element={<ProtectedRoute><Timer /></ProtectedRoute>} />
        <Route path="/bugs" element={<ProtectedRoute><Bugs /></ProtectedRoute>} />
        {/* <Route path="/team" element={<ProtectedRoute><Team /></ProtectedRoute>} /> */}
        <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App