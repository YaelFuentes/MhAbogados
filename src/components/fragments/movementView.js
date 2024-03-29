import React, { useState } from 'react'
import TableEdit from '../flowbite/tableEdit'
import NewMovement from './newMovement'
import ButtonIcon from '../mui/iconButton'
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios'
import BasicModal from '../mui/modal';
import Swal from 'sweetalert2';

const MovementView = ({ rows, selectedRow, infoClient }) => {
  const [selected, setSelected] = useState(null)
  const [editMode, setEditMode] = useState({
    idmovimiento: selected && selected.idmovimiento ? selected.idmovimiento : '',
    idexp: selectedRow.idexp,
    tipomov: '',
    fecha: ''
  })

  const handleRowClick = (row) => {
    setSelected(row);
    setEditMode({
      idmovimiento: editMode.idmov || row.idmovimiento,
      idexp: row.idexp,
      tipomov: editMode.tipomov || row.tipomov || '',
      fecha: editMode.fecha || row.fecha || '',
    });
  };


  const deleteRow = async () => {
    try {
      const id = selected && selected.idmovimiento ? selected.idmovimiento : []
      const response = await axios.delete(`/api/movimientos/movimientos?id=${id}`)
      return response
    } catch (e) {
      console.error('Error al intentar eliminar el dato: ', e)
    }
  }

  const Alert = async () => {
    try {
      const result = await Swal.fire({
        title: 'Eliminar movimiento?',
        text: "Si lo hace no podra revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Elimínalo!',
        customClass: {
          container: 'z-[1500]' // Ajusta este valor según sea necesario
        }
      });
      if (result.isConfirmed) {
        await deleteRow(); // Invoca deleteRow como una función async
        Swal.fire('Eliminado!', 'Su movimiento fue eliminado con exito.', 'success');
      } else {
        Swal.fire('Error', 'Error al intentar eliminar, intentelo mas tarde', 'error')
      }
    } catch (e) {
      console.log('Error al eliminar los datos: ', e)
    }
  }


  const handleSave = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.put(`/api/movimientos/movimientos?id=${selected.idmovimiento}`, editMode);
      if (response.data.success) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `Movimiento guardado con exito y Notificado al usuario`,
          showConfirmButton: false,
          timer: '1500',
          customClass: {
            container: 'z-[1500]' // Ajusta este valor según sea necesario
          }
        })
        setTimeout(() => {
          location.reload();
        }, 2000);
      } else {
        Swal.fire({
          position: 'bottom-start',
          icon: 'error',
          title: 'Error al editar el Movimiento, intentelo mas tarde',
          showConfirmButton: false,
          timer: '1500',
          customClass: {
            container: 'z-[1500]' // Ajusta este valor según sea necesario
          }
        })
      }
    } catch (e) {
      console.error(`Error al modificar los datos: `, e)
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) {
      return 'Sin fecha colocada';
    }
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
    return formattedDate;
  }

  const columnsTableMovimientos = [
    { id: 'idexp', label: 'Nro Exp' },
    { id: 'tipomov', label: 'Movimiento' },
    { id: 'fecha', label: 'Fecha', format: (value) => formatDate(value) }
  ];

  const formatDateForInput = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditMode((prevEdit) => ({
      ...prevEdit,
      [name]: value
    }))
  };

  const buttons = [{
    button: <ButtonIcon
      icon={<DeleteIcon />}
      onClick={Alert}
    />,
    onClick: (row) => {
      handleRowClick(row)
    }
  }, {
    button: <BasicModal
      nameButton={'Editar'}
      titleModal={'Editar Movimiento'}
      contentModal={
        <div>
          <form className='max-w-md mx-auto' onSubmit={handleSave}>
            <div className='relative z-0 w-full mb-5 group'>
              <input
                type='text'
                name='idexp'
                onChange={handleChange}
                placeholder=" "
                required
                value={editMode.idexp}
                className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
              />
              <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Nro Expediente
              </label>
            </div>
            <div className='relative z-0 w-full mb-5 mt-5 group'>
              <input
                type='text'
                name='tipomov'
                onChange={handleChange}
                placeholder=" "
                required
                value={editMode.tipomov}
                className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
              />
              <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Movimiento
              </label>
            </div>
            <div className='relative z-0 w-full mb-5 group'>
              <input
                type='date'
                name='fecha'
                onChange={handleChange}
                placeholder=" "
                value={formatDateForInput(editMode.fecha)}
                readOnly
                required
                className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
              />
              <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Fecha
              </label>
            </div>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Guardar
            </button>
          </form>
        </div>
      }
    />,
    onClick: (row) => {
      handleRowClick(row);
    }
  }]
  return (
    <>
      <div>
        <div>
          <NewMovement
            idexp={selectedRow && selectedRow.idexp ? selectedRow.idexp : []}
            infoClient={infoClient}
            infoExp={selectedRow}
          />
          <TableEdit
            rows={rows || []}
            columns={columnsTableMovimientos}
            buttons={buttons}
          />

        </div>
      </div>
    </>
  )
}

export default MovementView;