import React from "react"
import { Routes,Route } from "react-router-dom"
import Signin from "./Components/Signin"
import Room from "./Components/Room"
import CreateRoom from "./Components/CreateRoom"
import Roompage from "./Room"
import JoinRoom from "./Components/JoinRoom"

const App = () => {
  return(
    <>
    <Routes>
      <Route path = "/" element = {<Signin/>} />
      <Route path = "/room" element= {<Room/>} />
      <Route path = "/createroom" element = {<CreateRoom/>} />
      <Route path = "/room/:roomid" element = {<Roompage/>} />
      <Route path = "/joinroom" element = {<JoinRoom/>} />
    </Routes>
    </>
  )
}

export default App 
