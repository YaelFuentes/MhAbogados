import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TableEdit from '../flowbite/tableEdit';

const NewMovementExp = ({ id }) => {
  const [formData, setFormData] = useState([])
  const [loading, setLoading] = useState(true);
  const [movimientos, setMovimientos] = useState([])

  useEffect(() => {
    const fetchData = async() => {
      try{
        const response = await axios.get(`/api/movimientos/movimientos?idexp=${id}`)
        setMovimientos(response.data)
        setLoading(false)
      }catch(e){
        console.error('Error al obtener los datos de los movimientos: ', e)
        setLoading(false)
      }
    }
    fetchData()
  }, [id])

/*   const handleSubmit = async(e) => {
    e.preventDefault()
    try{
      const response = await axios.post(`/api/movimientos/movimientos`)
    }catch(e){

    }
  } */

  if (loading) {
    return <p>Cargando...</p>;
  }
  return (
    <>
      <div>
        {/* <TableEdit 
          columns={}
          rows={}
        /> */}
      </div>
    </>
  )
}

export default NewMovementExp;