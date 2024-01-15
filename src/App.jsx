import { useState } from 'react'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import Signup from './Signup'
import Login from './Login'
import LandingPage from './LandingPage'
import Questions from './Questions'
import AddQuestions from './AddQuestions'
import Test from './Test'
import Admins from './Admins'
import Dates from './Dates'
import Questack from './QueStack'
import Protectedquestack from './Protectedquestack'
import Admindates from './Admindates'
import Alldates from './Alldates'
import Allquestack from './Allquestack'

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
          <Route path='/displayAdmins' element={<Admins/>} ></Route>
          <Route path='/Dates' element={<Dates/>} ></Route>
          <Route path="/admins/:adminId/dates/:date/:adminUsername" element={<Questack />} />
          <Route path="/admins/protectedRoute/:adminId/dates/:date/:adminUsername" element={<Protectedquestack />} />
          <Route path="/admins/:adminId/:adminUsername" element={<Dates />} />
          <Route path="/admins/protectedRoute/:adminId/:adminUsername" element={<Admindates />} />
          <Route path="/admins/getAllDates" element={<Alldates />} />
          <Route path="/admins/Alldates/:date" element={<Allquestack />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
