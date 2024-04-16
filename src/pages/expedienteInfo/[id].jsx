import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import NewMovementExp from '@/components/fragments/newMovementExpedient';
import DeleteIcon from '@mui/icons-material/Delete';
import ButtonIcon from '@/components/mui/iconButton';
import axios from 'axios'
import Swal from 'sweetalert2'
import moment from 'moment'
import TableEdit from '@/components/flowbite/tableEdit';
import BasicModal from '@/components/mui/modal';
import MovementView from '@/components/fragments/movementView';
import { IconButton } from '@mui/material';

const idExpediente = () => {
  const router = useRouter();
  const expedienteId = router.query.id
  const [users, setUsers] = useState([])
  const [expediente, setExpediente] = useState([])
  const [filteresUsers, setFilteredUsers] = useState(expediente)
  const [selectedRow, setSelectedRow] = useState(null)
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    fecha: moment().format('YYYY-MM-DD'),
    tipomov: '',
    detalles: '',
    idexp: expedienteId
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/usuarios/usuario')
        const responseExp = await axios.get(`/api/movimientos/movimientos?mov=${expedienteId}`)
        const expedienteData = responseExp.data.map(item => ({
          idexp: item.idexp,
          fecha: moment(item.fecha).format('DD/MM/YYYY'),
          tipomov: item.tipomov
        }));
        setExpediente(expedienteData)
        setUsers(response.data)
        setLoading(false)
      } catch (e) {
        console.error('Error al ingresar los datos: ', e)
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    setFilteredUsers(expediente);
  }, [expediente])

  const columnsTable = [
    { id: "idexp", label: 'Id exp' },
    { id: "fecha", label: 'Fecha' },
    { id: "tipomov", label: 'Movimiento' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`/api/movimientos/movimientos?id=${expedienteId}`, formData)
      if (response.status === 201) {
        Swal.fire({
          position: 'bottom-start',
          icon: 'success',
          title: 'Usuario guardado con exito',
          showConfirmButton: false,
          timer: '1500'
        })
        setTimeout(() => {
          location.reload();
        }, 2000);
      } else {
        Swal.fire({
          position: 'bottom-start',
          icon: 'error',
          title: 'Error al crear el usuario, intentelo mas tarde',
          showConfirmButton: false,
          timer: '1500'
        })
      }
    } catch (e) {
      console.error(`Error al modificar los datos: `, e)
    }
  }

  const handleRowClick = (row) => {
    setSelectedRow(row);
  };

  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value })
  }

  if (loading) {
    return <p>Cargando...</p>;
  }

  /* const buttons = [
    {
      button: <BasicModal
        nameButton={'Editar'}
        titleModal={`Editar Movimiento`}
        contentModal={
          <>
            <div>
              <form className='max-w-md mx-auto' onSubmit={handleSave}>
                
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
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Guardar
                </button>
              </form>
            </div>
          </>
        }
      />,
      onClick: (row) => {
        handleRowClick(row)
      }
    },
    {
      button: <IconButton
        icon={<DeleteIcon />}
      /* onClick={deleteRow} 
      />,
      onClick: (row) => {
        handleRowClick(row)
      }
    }
  ] */

  return (
    <>
      <div className='p-2 m-2'>
        <div className='font-bold text-2xl'>
          Agregar Movimientos directos al expediente
        </div>
        <div className='mt-4 mb-4 text-center'>
          Advertencia: Al cargar un movimiento directo al expediente se veran reflejado en todos los clientes que esten
          asociados a ese expediente.
        </div>
        <div>
          <h1 className='font-bold m-2 text-xl text-center'>Agregar movimiento al expediente</h1>
          <form class="max-w-md mx-auto" onSubmit={handleSubmit}>
            <div class="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="tipomov"
                id="tipomov"
                onChange={handleChange}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Tipo de movimiento</label>
              <div className="relative z-0 w-full mt-5 group">
                <input
                  type="text"
                  name="detalles"
                  id="detalles"
                  onChange={handleChange}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Detalle (opcional)</label>
              </div>
            </div>
            <div className='text-center p-5'>
              <button type="submit" class="text-white bg-primary-10 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Agregar movimiento</button>
            </div>
          </form>
          <div>
            <h1 className='font-bold m-2 text-xl text-center'>Historial de movimientos</h1>
          </div>
          <div>
            <TableEdit
              rows={filteresUsers}
              columns={columnsTable}
              onClickRow={handleRowClick}

            />
          </div>
        </div >
        <NewMovementExp id={expedienteId} />
      </div >
    </>
  )
}
export default idExpediente;