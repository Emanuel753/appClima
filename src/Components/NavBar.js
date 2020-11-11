import React from 'react'
import mas from '../Resources/mas.png'
import menu from '../Resources/menu.png'
import {LocalizacionContex} from '../Context/LocalizacionProvider'

const NavBar = () => {
    const Style = {
        width:"0"
    }
    const [estilos,setEstilos] = React.useState({})
    const [estilosA,setEstilosA] = React.useState({})
    const [estilosAgregar,setEstilosAgregar] = React.useState(Style)
    const [estilosAgregarContenido,setEstilosAgregarContenido] = React.useState({});
    const [rotar,setRotar] = React.useState({})

    const {ciudad,setCiudad} = React.useContext(LocalizacionContex)
    const [busqueda,setBusqueda] = React.useState("")

    const expandir = () =>{
        const style = {
            display:"block",
            height:"100px",
            width:"150px",
            transition:".5s"   
        }
        const styleA = {
            display: "block"
        }

        if(estilos.height ==="100px"){
            const style = {
                height:"0",
                width:"0",
                transition:".5s"
            }
            const styleA = {
                display:"none"
            }
            setEstilos(style)
            setEstilosA(styleA)
            return
        }
        setEstilos(style)
        setEstilosA(styleA)

    }
    
    const expandirAgregar = () =>{
        const Style = {
            width:"100vw",
            transition: ".4s",
            display:"block"
        }
        const StyleCont = {
            display:"block"
        }
        const styleR = {
            transform: "rotate(46deg)"
        }


        if(estilosAgregar.width ==="100vw"){
            const Style = {
                width:"0"
            }
            const StyleCont = {
                display:"none"
            }
            const styleR = {
                transform: "rotate(0)"
            }
            setEstilosAgregarContenido(StyleCont)
            setEstilosAgregar(Style)
            setRotar(styleR)
            return
        }
        setEstilosAgregar(Style)
        setEstilosAgregarContenido(StyleCont)
        setRotar(styleR)
    }

    const precionar = (e) =>{
       
        if (e.charCode === 13 ){
           if(busqueda.length === 0){
               
            setCiudad("Cordoba")
           
           }else{
            setCiudad(e.target.value)
             
           }
        }
  
    }

    return (
        <div className = "Navbar">
            <div className = "Navbar__agregar">
                <button className = "NavBar__agregar-button" onClick = {()=>expandirAgregar()}
                style = {rotar}
                 type = "button"><img alt = "mas" src = {mas} /></button>
                <div className = "NavBar-Agregar__contenido" style = {estilosAgregar}>
                    <div className = "Navbar-Agregar__contenido-div" style = {estilosAgregarContenido}>
                       <h3 >Cordoba</h3> 
                    </div>
                    
                </div>
            </div>
            <div className = "NavBar__ciudad">
                  
                 <input type = "text" 
                    placeholder = {ciudad}
                    onChange = {e=>setBusqueda(e.target.value)}
                    value = {busqueda}
                    onKeyPress = {e=> precionar(e)}
                    />

            </div>
            <div className = "Navbar__ajustes">
                <button className = "NavBarMobile__menu-button"
                onClick = {()=>expandir()}><img alt = "menu" src = {menu} /></button>
                <div className = "Navbar__contenidoAjustes"
                style = {estilos}>
                    <a style = {estilosA} href = "/">Compartir</a>
                    <a style = {estilosA} href = "/">Ajustes</a>
                </div>
            </div>
        </div>
    )
}

export default NavBar
