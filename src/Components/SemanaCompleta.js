import React from 'react'
import {SemanaContext} from '../Context/SemanaProvider'
import {LocalizacionContex} from '../Context/LocalizacionProvider'
import useFetch from '../Hooks/useFetch'
import Spinner from '../Components/Spinner'

const SemanaCompleta = () => {
    const {temp} = React.useContext(SemanaContext)
    const {lat,lon} = React.useContext(LocalizacionContex)
    const {data} = useFetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=49bc2c126144156c937530d11b4475e7&lang=es-ES`)
 
    const fecha = new Date()
    fecha.setDate(fecha.getDate()) //Para que se pueda sumar fechas correctamente
    const dia = fecha.getDate()
    const mes = fecha.getMonth() + 1
    const anio = fecha.getFullYear()
    // data.daily[0].weather[0].icon
     return (<div className = "">
                         <h1 style = {{textAlign: "center"}}>Pronostico de 8 días</h1>
                {data.length === 0 
                    ? <Spinner />
                    :temp[0] != null && Object.values(temp[0]).map((a,i)=>{
                    return <div className = "Semanal__dias" key = {i}>
                                <div className = "Semanal__dias-diaSemana">
                                    <img className = "Semanal__dias-img" alt = {data.daily[i].weather[0].main} src = {`http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@2x.png`}/>
                                    <div>
                                        <h5 className = "Semanal__dias-h1">{a.dia}</h5>
                                        <span className = ".Semanal__dias-span">{dia + i + "/" + mes + "/" + anio}</span>
                                    </div>
                                </div>
                                <div className ="Semanal__dias-clima">
                                        <h6>{(data.daily[i].weather[0].main).trim()}</h6>
                                </div>
                                <div>
                                    <h5>{a.tempMax}° / {a.tempMin}°</h5>
                                </div>
                            </div>
                    })
                }
           
            </div>)
}

export default SemanaCompleta
