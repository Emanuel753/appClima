import React from 'react'
import useFetch from '../Hooks/useFetch'
import Spinner from '../Components/Spinner'
import {LocalizacionContex} from '../Context/LocalizacionProvider'

const Temperatura = () => {
    
    const {setLat,setLon,ciudad} = React.useContext(LocalizacionContex)
   
   

    const {data} = useFetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=49bc2c126144156c937530d11b4475e7`)


    React.useEffect(()=>{
        const setCoord = () =>{

            if (data.length === 0){
                return 
            }
            const lat = data.coord.lat
            const lon = data.coord.lon
            setLat(lat)
            setLon(lon)
        }
        setCoord()
    },[data,setLat,setLon])

    if (data.length === 0){
        return <Spinner />
    }

    const Celcius = data.main.temp - 273.15 //convertir de kelvin a celsius

    return (
        <div className = "Temp__contenedor">
            <h1 className = "Temp__temperatura">{parseInt(Celcius)+"°"}</h1>
            <h3>{data.weather[0].description}</h3>

        </div>
    )
    
}

export default Temperatura
