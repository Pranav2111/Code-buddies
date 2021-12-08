import React from 'react'
import Head from 'next/head'
import Modal from '../components/Modal'
import Navbar from '../components/Navbar'
import Profilefeed from '../components/Profilefeed'
import Profilemodal from '../components/Profilemodal'

function Profilepage() {
    return (
        <div className="bg-gray-50 h-screen overflow-y-scroll scrollbar-hide">
      <Head>
        <title>Code-Buddies</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar/>

      <Profilefeed/>
      
      <Modal/>

      <Profilemodal/>
      </div>
    )
}

export default Profilepage
