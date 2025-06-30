import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { Login } from './pages/auth/login/Login'
import { Register } from './pages/auth/register/Register'
import { Home } from './pages/home/Home'
import { useAuth } from './contexts/authContext'

function App() {

  //Pegando o token do contexto
  const { token } = useAuth()

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={!token ? <Login /> : <Navigate to={"/home"} /> } />
          <Route path='/register' element={!token ? <Register /> : <Navigate to={"/home"}/>} />
          <Route path='/home' element={!token ? <Navigate to="/login" /> : <Home />} />

          {/*Se não tiver token ou for para páginas desconhecidas levam para a home ou login */}
          {!token && <Route path="*" element={<Navigate to="/login" />} />}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
