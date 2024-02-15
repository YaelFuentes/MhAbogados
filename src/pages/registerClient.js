import React, { useState, useEffect } from 'react';
import BasicModal from '@/components/mui/modal';
import axios from 'axios';
import Swal from 'sweetalert2'

const RegisterClient = () => {
  const [formData, setFormData] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/usuarios/userClient`, formData)
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
      console.error('Error al insertar los datos: ', e)
    }
  }

  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value })
  }
  return (
    <>
      <BasicModal
        nameButton={'Registrarse'}
        titleModal={'Registrese para ver los moviminentos de su expediente'}
        contentModal={
          <>
            <div>
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="text" className="block mb-2 text-sm font-medium text-black dark:text-white">Nombre</label>
                  <input
                    name="name"
                    type="text"
                    onChange={handleChange}
                    required
                    placeholder="Nombre"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                <div>
                  <label htmlFor="text" className="block mb-2 text-sm font-medium text-black dark:text-white">Apellido</label>
                  <input
                    name="lastname"
                    type="text"
                    onChange={handleChange}
                    required
                    placeholder="Apellido"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                <div>
                  <label htmlFor="text" className="block mb-2 text-sm font-medium text-black dark:text-white">Email</label>
                  <input
                    name="email"
                    type="text"
                    onChange={handleChange}
                    required
                    placeholder="Email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                <div>
                  <label htmlFor="text" className="block mb-2 text-sm font-medium text-black dark:text-white">DNI</label>
                  <input
                    name="dni"
                    type="text"
                    onChange={handleChange}
                    required
                    placeholder="DNI"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                <div>
                  <label htmlFor="text" className="block mb-2 text-sm font-medium text-black dark:text-white">Contraseña</label>
                  <input
                    name="password"
                    type="password"
                    onChange={handleChange}
                    required
                    placeholder="Contraseña"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                <div className='text-center p-5'>
                  <button type="submit" class="text-white bg-primary-10 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Guardar</button>
                </div>
              </form>
            </div>
          </>
        }
      />
    </>
  )
}
export default RegisterClient
