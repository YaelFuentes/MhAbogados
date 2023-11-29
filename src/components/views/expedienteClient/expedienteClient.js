import React, { useState, useEffect } from 'react'
import axios from 'axios'
import TableEdit from '@/components/flowbite/tableEdit';
import NestedModal from '@/components/mui/NestedModal';
import NewFile from '../nuevoExpediente/newFile';

const ExpedienteCliente = ({ id }) => {
  const [expediente, setExpediente] = useState([])
  const [loading, setLoading] = useState(true);
  console.log(expediente)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/expediente/expediente?id=${id}`)
        setExpediente(response.data)
        setLoading(false)
      } catch (e) {
        console.error(e)
        setLoading(false)
      }
    }
    fetchData()
  }, [id])

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (!expediente) {
    return <p>Error al cargar los datos.</p>;
  }

  const formatDate = (dateString) => {
    if (!dateString) {
      return 'Sin fecha colocada';
    }
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
    return formattedDate;
  }

  const columnsTable = [
    { id: "idexp", label: 'Expediente' },
    { id: "caratula", label: 'Caratula' },
    { id: 'juzgasecret', label: 'Secretaría' },
    { id: "camara", label: 'Camara' },
    { id: "decretos", label: 'Decretos' },
    { id: "fechasentencia", label: 'Fecha Sentencia', format: (value) => formatDate(value) },
  ];

  return (
    <>
      <div className='w-full'>
        <div className='text-center p-2 m-2'>
          <h1 className='font-bold m-2'>Datos del cliente</h1>
          <h3>Nombre y apellido : {expediente.getClientDni.nombre} {expediente.getClientDni.apellido}</h3>
          <h3>Dni : {expediente.getClientDni.dni}</h3>
        </div>
        <div>
          <h1 className='font-bold m-2 text-center'>Expediente</h1>
          <TableEdit
            columns={columnsTable}
            rows={expediente.expedienteInfo}
            editButtonComponent={
              'editar'
            }
          />
        </div>
        <div>
          <NewFile id={id} />
        </div>
      </div>
    </>
  )
}

export default ExpedienteCliente;