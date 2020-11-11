import React from 'react'

export const LocalizacionContex = React.createContext()

const LocalizacionProvider = (props) => {
    const [lat,setLat] = React.useState("-31.41")
    const [lon,setLon] = React.useState("-64.18")
    const [ciudad,setCiudad] = React.useState("Cordoba")

    return (
        <LocalizacionContex.Provider value = {{lat,setLat,lon,setLon,ciudad,setCiudad}}>
            {props.children}
        </LocalizacionContex.Provider>
    )
}

export default LocalizacionProvider
