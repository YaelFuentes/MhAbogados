import axios from 'axios'
import React, { useState, useEffect } from 'react'
import BasicModal from '../mui/modal'
import Swal from 'sweetalert2'

const NewMovement = ({ idexp, infoClient, infoExp }) => {
  const [formData, setFormData] = useState({
    idexp: idexp,
    fecha: ''
  })

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    const fechaActualFormatted = `${year}-${month}-${day}`;
    setFormData((prevData) => ({ ...prevData, fecha: fechaActualFormatted }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const dataMail = { formData, infoClient, infoExp }
      const response = await axios.post(`/api/movimientos/movimientos`, formData)
      const sendMail = await axios.post(`/api/notification/notification`, dataMail)
      if (response.status === 201 && sendMail.status === 201) {
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
        /* setTimeout(() => {
          location.reload();
        }, 2000); */
      } else {
        Swal.fire({
          position: 'bottom-start',
          icon: 'error',
          title: 'Error al guardar Movimiento, intentelo mas tarde',
          showConfirmButton: false,
          timer: '1500',
          customClass: {
            container: 'z-[1500]' // Ajusta este valor según sea necesario
          }
        })
      }
    } catch (e) {
      console.error('No se pudo cargar el movimiento: ', e)
    }
  }

  const handleChange = ({ target }) => {
    if (target.name !== 'fecha') {
      setFormData({ ...formData, [target.name]: target.value });
    }
  };

  return (
    <>
      <div className='text-center mb-4'>
        <BasicModal
          nameButton='Añadir movimiento'
          titleModal='Añadir nuevo movimiento'
          contentModal={
            <>
              <div>
                <form className='max-w-md mx-auto' onSubmit={handleSubmit}>
                  <div className='relative z-0 w-full mb-5 group'>
                    <input
                      type='text'
                      name='idexp'
                      onChange={handleChange}
                      placeholder=" "
                      required
                      value={idexp}
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
                      value={formData.fecha}
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
            </>
          }
        />
      </div>
    </>
  )
}

export default NewMovement;