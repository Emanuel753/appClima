import React from 'react'
import axios from 'axios'

const useFetch = (url) => {
    const [data,setData] = React.useState([])
    let cancelToken = undefined

    React.useEffect(()=>{
        const fetchData = async() =>{
            try {
                
                const res = await axios.get(url,{cancelToken: null  }).catch((e)=>{
                    
                    if (parseInt(e.response.data.cod) ===404){
                        
                        return }
                    if (parseInt(e.response.data.cod) ===200){
                        
                        console.log("token 200",cancelToken)
                        return }
                    }
                )

                
                setData(res.data)
    
            } catch (error) {
               
            }

        }
        fetchData()

    },[url,cancelToken])
    return {data}
}
export default useFetch
