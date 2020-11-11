import React from 'react'
import useFetch from '../Hooks/useFetch'
import Spinner from '../Components/Spinner'
import {Link} from 'react-router-dom'
import {SemanaContext} from '../Context/SemanaProvider'
import {LocalizacionContex} from '../Context/LocalizacionProvider'

const Semanal = () => {
    const {temp,setTemp} = React.useContext(SemanaContext)
    const {lat,lon} = React.useContext(LocalizacionContex)


     const {data} = useFetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=49bc2c126144156c937530d11b4475e7&lang=es-ES`)
     const [nomDia,setNomDia] = React.useState([])
     const [fechaCompleta,setFechaCompleta] = React.useState("")
     

    React.useEffect(()=>{
        const obtenerDia = () =>{
            const fecha = new Date();
            const mes = fecha.getMonth() + 1 //Al mes hay que sumarle uno
            const anio = fecha.getFullYear()
            
            const FechaCompleta  = [fecha.getDate() + "/" + mes + "/" + anio] // Fecha dd/mm/yyyy

            const semana = ["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"]
            const diasFinal = [semana[fecha.getDay()]] //Dias con nombre (lun,mar,mier,etc)

            let FechaTemp = [] //array para guardar dia de la seman, fecha max y min

            data.length === 0 ? <p></p>

            : data.daily.map((a,i)=>{
                if (i === 0) {
                    FechaTemp = [
                        {dia:semana[fecha.getDay()],
                        tempMax:parseInt(data.daily[0].temp.max - 273.15),
                        tempMin: parseInt(data.daily[0].temp.min - 273.15)}
                    ]
                }
                while (i<7) {
                    
                    fecha.setDate(fecha.getDate()+1)
                    const dia = fecha.getDate()
                    
                   FechaCompleta.push(dia + "/" + mes + "/" + anio)
                   
                   diasFinal.push(semana[fecha.getDay()]) //Agrego los nombre de los dias en el array
                    
                   setFechaCompleta(FechaCompleta)
                   setNomDia(diasFinal) 

                   //Temperatura por 8 dias
                   FechaTemp = [
                           ...FechaTemp,
                           {dia:diasFinal[i+1],
                            tempMax: parseInt(data.daily[i+1].temp.max - 273.15),
                            tempMin: parseInt(data.daily[i+1].temp.min - 273.15)}
                       
                   ]
                     
                   return setTemp([FechaTemp])
                }
                return 1
            })
             
        }

        obtenerDia()
    },[data,setTemp])
    
    return (
        <div className = "Semanal__contenedor">
            <h2>Pronostico semanal</h2>
            {data.length === 0 
            ? <Spinner />
            :(<div className = "Semanal__dias-contenedor">
                {temp[0] != null && Object.values(temp[0]).map((a,i)=>{
                    // While para que liste desde el dia de mañana
                    while (i<4 && i>0) {

                        return (
                        <div className = "Semanal__dias" key = {i}>
                            <div className = "Semanal__dias-diaSemana">
                                <img className = "Semanal__dias-img" alt = {data.daily[i].weather[0].main} src = {`http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@2x.png`}/>
                                <div>
                                    <h5 className = "Semanal__dias-h1">{a.dia}</h5>
                                    <span className = ".Semanal__dias-span">{fechaCompleta[i]}</span>
                                </div>
                            </div>
                            <div className ="Semanal__dias-clima">
                                    <h6>{(data.daily[i].weather[0].main).trim()}</h6>
                            </div>
                            <div>
                                <h5>{a.tempMax}° / {a.tempMin}°</h5>
                            </div>
                          
                        </div>)    
                    }
                    return null
                })}
                <Link className = "Semanal__verMas" state ={nomDia} to = "/scomp"><span>Pronóstico por 8 días</span></Link>
            </div>)}
            
        </div>
    )
}

export default Semanal
