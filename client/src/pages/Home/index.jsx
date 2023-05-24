import React from 'react'

import HomeSection from '../../components/Home'
import HomeNavbar from '../../components/Home/Navbar'

import { Center } from './style'

const Home = () => {
  return (
    <Center>
      <HomeNavbar />
      <HomeSection />
    </Center>
  )
}

export default Home
