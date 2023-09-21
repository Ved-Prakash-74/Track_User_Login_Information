import React from 'react'
import {Routes , Route} from 'react-router-dom'
import Home from './Pages/Home'
import AboutUs from './Pages/AboutUs'
import ContactUs from './Pages/ContactUs'
import Login from './Pages/Login'
import SignUp from './Pages/SignUp'
import LoginHistory from './Pages/LoginHistory'


export const AllRouting = () => {
  return (
    <div>
        <Routes>
            <Route exact path='/' Component={Home}></Route>
            <Route exact path='/' Component={AboutUs}></Route>
            <Route exact path='/' Component={ContactUs}></Route>
            <Route exact path='/Login' Component={Login}></Route>
            <Route exact path='/SignUp' Component={SignUp}></Route>
            <Route exact path='/LoginHistory' Component={LoginHistory}></Route>
        </Routes>
    </div>
  )
}
