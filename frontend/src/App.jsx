import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route,Routes,Navigate } from 'react-router-dom'
import Login from './pages/login/Login'
import SignUp from './pages/signup/Signup'
import Home from './pages/home/Home'
import { useAuthContext } from './components/context/AuthContext'

function App() {
  
const{authUser} = useAuthContext();

  return (
    <div className='p-4 h-screen flex items-center justify-center'>
    <Routes>
      <Route path='/' element={authUser ? <Home/> : <Navigate to={"/login"}/>}/>
      <Route path='/login' element={authUser ? <Navigate to="/"/>:<Login/>}/>
      <Route path='/signup' element={authUser ? <Navigate to="/"/>:<SignUp/>}/>
    </Routes>
   
    </div>
   
  )
}

export default App
