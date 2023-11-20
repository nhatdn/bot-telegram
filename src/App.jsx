import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from "./pages/login";
import Home from "./pages/home";
import { Authentication } from './authentication';
function App() {
  // <Authentication noneAuth={<Login/>} auth={<Home/>}/>
  return (
    <Home/>
  )
}

export default App
