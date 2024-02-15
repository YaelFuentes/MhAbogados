import React, { useState, useEffect } from 'react';
import BasicModal from '@/components/mui/modal';
import axios from 'axios';
import Swal from 'sweetalert2';

const style = {
  background: 'none',
  border: 'none',
  color: '#3182ce',
  textDecoration: 'underline',
  cursor: 'pointer',
}
const ForgotPassword = () => {
  const [formData, setFormData] = useState({})


  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`/api/notification/notification?action=update`, formData)
      if(response.status == 201){
        Swal.fire({
          position: 'bottom-start',
          icon: 'info',
          title: 'Correo enviado para modificar su contraseña.',
          showConfirmButton: false,
          timer: '1500'
        })
      }else{
        Swal.fire({
          position: 'bottom-start',
          icon: 'error',
          title: 'Error al modificar la contraseña, intentelo nuevamente mas tarde.',
          showConfirmButton: false,
          timer: '1500'
        })
      }
    } catch (err) {
      console.error('Error al intentar cambiar la contraseña.', err)
    }
  }

  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value })
  }

  return (
    <>
      <BasicModal
        nameButton={'Olvidaste la contraseña?'}
        styledButton={style}
        titleModal={'Por favor introduzca su nro de documento.'}
        contentModal={
          <>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="text" className="block mb-2 text-sm font-medium text-black dark:text-white">DNI</label>
                <input
                  name="dni"
                  type="text"
                  onChange={handleChange}
                  required
                  placeholder=""
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
              </div>
              <div className='text-center p-5'>
                <button type="submit" class="text-white bg-primary-10 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Enviar</button>
              </div>
            </form>
          </>
        }
      />
    </>
  )
}
export default ForgotPassword;