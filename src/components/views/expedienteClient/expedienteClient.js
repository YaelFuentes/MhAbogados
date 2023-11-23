import React, { useState, useEffect } from 'react'
import axios from 'axios'
import TableEdit from '@/components/flowbite/tableEdit';
import NestedModal from '@/components/mui/NestedModal';
import NewFile from '../nuevoExpediente/newFile';

const ExpedienteCliente = ({ id }) => {
  const [expediente, setExpediente] = useState([])
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/expediente/expediente?id=${id}`);
      const data = response.data;
      console.log('Data from API:', data);
      localStorage.setItem(`expedienteData_${id}`, JSON.stringify(data));
      setExpediente(data);
      setLoading(false);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem(`expedienteData_${id}`));
    if (storedData) {
      setExpediente(storedData);
      setLoading(false);
    } else {
      fetchData();
    }
  }, [id]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (!expediente) {
    return <p>Error al cargar los datos.</p>;
  }

  const columnsTable = [
    { id: "idexp", label: 'Expediente' },
    { id: "caratula", label: 'Caratula' },
    { id: "dni", label: 'DNI' },
    { id: "decretos", label: 'Decretos' },
    { id: "email", label: 'Correo Electrónico' },
    { id: "fechasentencia", label: 'Fecha Sentencia' },
    /*  { id: "", label: 'Editar' }, */
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
          <NewFile />
        </div>
      </div>
    </>
  )
}

export default ExpedienteCliente;