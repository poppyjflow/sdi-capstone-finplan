//import components
import React from "react";
import {Routes, Route} from 'react-router-dom';
import Home from "./Home";
import Login from './components/Login.js'
import SignUp from './components/SignUp.js'
import './css/app.css'



function App() {
  return (
    <div className='webpage'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='login' element={<Login/>} />
          <Route path='signup' element={<SignUp/>} />

        </Routes>
    </div>
  );
}

export default App;

/* <Route path='/missions' element={<Missions />} />
<Route path="/missions/:missionid" element={<SingleMission/>} />
<Route path='/teams' element={<Teams />} />
<Route path="/teams/:teamid" element={<SingleTeam/>} />
<Route path='/personnel' element={<PersonnelList />} />
<Route path="/personnel/:personid" element={<SinglePerson/>} /> */
