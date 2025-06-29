import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Login } from './pages/auth/login/Login'
import { Register } from './pages/auth/register/Register'

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
