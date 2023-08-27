import React from 'react'
import Body from '../components/body'
import header from '../components/header'
import Sidebar from '../components/Sidebar'


const Dashboard = () => {
  return (
    <>
    <div style={{ display: 'flex' }}>
      {/* Sidebar */}
      <div style={{ flex: '0 0', position: 'sticky', top: 0, left: 0, height: '100vh' }}>
        <Sidebar />
      </div>

      {/* Body */}
      <div style={{ flex: '1', overflowY: 'auto' , marginLeft:'3%'}}>
        <Body />
      </div>
    </div>
  </>
  )
}

export default Dashboard;