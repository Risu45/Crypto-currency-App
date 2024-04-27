import React from 'react'
import Navbar from './Navbar'
import Bodybackground from './Bodybackground'
// import Tabledemo from './Tabledemo'
import Table from './Table'

function Mainbody() {
  return (
    <div>
        <Navbar/>
        <Bodybackground/>
        <Table/>
        {/* <Tabledemo/> */}
    </div>
  )
}

export default Mainbody
