import React, { useState, useEffect } from 'react'
import axios from 'axios'
import TableEdit from '../flowbite/tableEdit'

const ExpedienteTableCliente = ({ exp }) => {
  const [client, setClient] = useState([])
  console.log(exp)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/expedienteCliente/ExpCliente?expc=${exp}`)
        setClient(response.data)
      } catch (e) {
        console.error('Error al traer los clientes en el expediente', e)
      }
    }
    fetchData()
  }, [])
  console.log(client)
  const columnsTable = [
    { id: 'dni', label: 'DNI' },
    { id: 'nombre', label: 'Nombre' },
    { id: 'apellido', label: 'Apellido' }
  ]
  return (
    <>
      <TableEdit rows={client} columns={columnsTable} />
    </>
  )
}

export default ExpedienteTableCliente