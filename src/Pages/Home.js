import React from 'react'
import NavBar from '../Components/NavBar'
import Semanal from '../Components/Semanal'
import Temperatura from '../Components/Temperatura'

const Home = () => {
    return (
        <div>
            <NavBar />
            <Temperatura />
            <Semanal />
        </div>
    )
}

export default Home
