import { useState } from 'react'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import Signup from './Signup'
import Login from './Login'
import LandingPage from './LandingPage'
import Questions from './Questions'
import AddQuestions from './AddQuestions'
import Test from './Test'

function App() {
  

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage/>} ></Route>
          <Route path='/signup' element={<Signup/>} ></Route>
          <Route path='/login' element={<Login/>} ></Route>
          <Route path='/questions' element={<Questions/>} ></Route>
          <Route path='/addquestions' element={<AddQuestions/>} ></Route>
          <Route path='/test' element={<Test/>} ></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
