import React, { useState, useEffect } from 'react'
import axios from 'axios'
import TableEdit from '@/components/flowbite/tableEdit';
import NewFile from '../nuevoExpediente/newFile';
import BasicModal from '@/components/mui/modal';
import FormEditExp from '@/components/fragments/formEditExp';
import IconButton from '@/components/mui/iconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import NewMovement from '@/components/fragments/newMovement';
import MovementView from '@/components/fragments/movementView';

const ExpedienteCliente = ({ id }) => {
  const [expediente, setExpediente] = useState([])
  const [loading, setLoading] = useState(true);
  const [movimientos, setMovimientos] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [movimientosDelExpediente, setMovimientosDelExpediente] = useState([]);

  console.log(expediente.getClientDni)
  console.log(selectedRow)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/expediente/expediente?id=${id}`)
        const responseMov = await axios.get(`/api/movimientos/movimientos?id=${id}`)
        setExpediente(response.data)
        setMovimientos(responseMov.data)
        setLoading(false)
      } catch (e) {
        console.error(e)
        setLoading(false)
      }
    }
    fetchData()
  }, [id])


  useEffect(() => {
    const fetchData = async () => {
      if (selectedRow) {
        const idexp = selectedRow.idexp;
        if (movimientos) {
          const movimientoDelExp = movimientos.find((movimientosArray) =>
            movimientosArray.some((movimiento) => movimiento.idexp === idexp)
          );
          setMovimientosDelExpediente(movimientoDelExp || []);
        }
      }
    };
    fetchData();
  }, [selectedRow, movimientos]);

  const handleRowClick = (row) => {
    setSelectedRow(row);
  };

  const deleteRow = async () => {
    try {
      const response = await axios.delete(`/api/expediente/expediente?id=${expediente.getClientDni.dni}&idexp=${selectedRow.idexp}`);
      console.log('response: ', response)
      if (response.status === 200) {
        console.log('Dato eliminado con exito.');
      } else {
        console.error('Error en la actualización:', response.data.error);
      }
    } catch (e) {
      console.error('Error al intentar eliminar los datos: ', e)
    }
  }

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
    { id: 'idexp', label: 'Expediente' },
    { id: 'caratula', label: 'Caratula' },
    { id: 'juzgasecret', label: 'Secretaría' },
    { id: 'camara', label: 'Camara' },
    { id: 'decretos', label: 'Decretos' },
    { id: 'fechasentencia', label: 'Fecha Sentencia', format: (value) => formatDate(value) },
  ];

  const buttons = [
    {
      button: <BasicModal
        nameButton={'Ver movimientos'}
        titleModal={`Movimientos de expediente Nro `}
        contentModal={
          <>
            <MovementView
              rows={movimientosDelExpediente}
              selectedRow={selectedRow}
              infoClient={expediente.getClientDni}
            />
          </>
        }
        styled={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '60%',
          maxHeight: '80vh',
          overflowY: 'auto',
          bgcolor: 'white',
          border: '2',
          borderColor: 'black',
          boxShadow: 'lg',
          p: '4',
        }}
      />,
      onClick: (row) => {
        handleRowClick(row)
      },
    },
    {
      button: <BasicModal
        nameButton={'Editar'}
        titleModal={`Editar expediente`}
        contentModal={
          <FormEditExp row={[selectedRow, expediente.getClientDni.dni]} />
        }
      />,
      onClick: (row) => {
        handleRowClick(row)
      }
    },
    {
      button: <IconButton
        icon={<DeleteIcon />}
        onClick={deleteRow}
      />,
      onClick: (row) => {
        handleRowClick(row)
      }
    }
  ]
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
            onClickRow={handleRowClick}
            buttons={buttons}
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