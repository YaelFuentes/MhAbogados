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
import Swal from 'sweetalert2';

const ExpedienteCliente = ({ id }) => {
  const [expediente, setExpediente] = useState([])
  const [loading, setLoading] = useState(true);
  const [movimientos, setMovimientos] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [movimientosDelExpediente, setMovimientosDelExpediente] = useState([]);

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

  const deleteRow = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.delete(`/api/expediente/expediente?id=${expediente.getClientDni.dni}&idexp=${selectedRow.idexp}`);
      if (response.status === 200) {
        const confirmResult = await Swal.fire({
          title: '¿Estás seguro que deseas eliminar esto?',
          text: '¡No podrás revertirlo!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '',
          confirmButtonText: 'Sí, Elimínalo!',
        });
        if (confirmResult.isConfirmed) {
          Swal.fire({
            position: 'bottom-start',
            icon: 'success',
            title: 'Expediente eliminado con éxito',
            showConfirmButton: false,
            timer: 1500,
          });
          setTimeout(() => {
            location.reload();
          }, 1500);
        }
      } else {
        Swal.fire({
          position: 'bottom-start',
          icon: 'error',
          title: 'Error al eliminar expediente, intentelo mas tarde',
          showConfirmButton: false,
          timer: '1500'
        })
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
        <div className='p-2 m-2'>
          <h1 className='font-bold m-2 text-xl text-center'>Datos del cliente</h1>
        </div>
        <div className="p-4 flex text-center">
          <div className="w-1/2">
            <h3 className=" font-semibold">
              Nombre y apellido: {expediente.getClientDni.nombre} {expediente.getClientDni.apellido}
            </h3>
          </div>
          <div className="w-1/2">
            <h3 className=" font-semibold">Dni: {expediente.getClientDni.dni}</h3>
          </div>
        </div>
        <div>
          <h1 className='font-bold m-2 text-xl text-center'>Listado de expedientes</h1>
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