import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useRouter } from 'next/router';


export default function ResetPassword() {
  const [password, setPassword] = useState({
    password: ''
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [clientId, setClientId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const { id } = router.query;
    if (id) {
      setClientId(id);
    }
  }, [router.query]);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        Swal.fire({
          position: 'bottom-start',
          icon: 'error',
          title: 'Error al modificar la contraseña, intentelo mas tarde.',
          showConfirmButton: false,
          timer: '2200'
        })
      } else {
        const updatedData = {
          password: password
        }
        const response = await axios.put(`/api/usuarios/userClient?id=${clientId}`, updatedData)
        if (response.status === 200) {
          Swal.fire({
            position: 'bottom-start',
            icon: 'success',
            title: 'Contraseña actualizada correctamente',
            showConfirmButton: false,
            timer: '1500'
          }).then(() => {
            router.push('/loginClient');
          });
        }
      }
    } catch (e) {
      console.error('Error al cambiar la contraseña: ', e)
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="bg-white w-full max-w-md p-8 rounded shadow-md">
        <h2 className="text-2xl text-center mb-6">Restablecer Contraseña</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Nueva Contraseña</label>
            <input
              type="password"
              name='password'
              id="password"
              value={password}
              onChange={handlePasswordChange}
              required
              className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirm-password" className="block text-gray-700">Confirmar Contraseña</label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
              className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Restablecer Contraseña</button>
        </form>
      </div>
    </div>
  );
}
