import React from 'react'

export const SemanaContext = React.createContext()

const SemanaProvider = (props) => {

    const [temp,setTemp] = React.useState([])

    return (
        <SemanaContext.Provider value = {{temp,setTemp}}>
            {props.children}
        </SemanaContext.Provider>
    )
}

export default SemanaProvider
