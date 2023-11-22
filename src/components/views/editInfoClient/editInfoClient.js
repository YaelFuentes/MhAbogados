import React, { useState, useEffect } from 'react'
import axios from 'axios'

const InfoClientTab = ({ id }) => {

    const [client, setClient] = useState({});
    const [editedClient, setEditedClient] = useState({});
    const [editMode, setEditMode] = useState(false);

    /* console.log(client) */

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/cliente/cliente?id=${id}`);
                const data = response.data;
                setClient(data);
                setEditedClient(data); // Inicializar editedClient con los datos del cliente
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [id]);

    const handleEdit = () => {
        setEditMode(true);
    }

    const handleSave = async () => {
        try {
            await axios.put(`/api/cliente/cliente?id=${id}`, editedClient);
            setEditMode(false);
            setClient(editedClient);
        } catch (err) {
            console.error(err);
        }
    };

    const handleCancel = () => {
        setEditMode(false);
        setEditedClient(client);
    };

    const handleClientChange = (e) => {
        const { name, value } = e.target;
        setEditedClient({
            ...editedClient,
            [name]: value,
        });
    };

    return (
        <div>
          <div>
            {editMode ? (
              <>
                <div>
                  <div className='bg-gray-200 p-4'>
                  <h3 className='font-bold text-lg'>Nombre</h3>
                    <input
                      type='text'
                      name='nombre'
                      placeholder='Nombre'
                      value={editedClient.nombre}
                      onChange={handleClientChange}
                      className='w-full p-2 mb-2'
                    />
                    <h3 className='font-bold text-lg'>Apellido</h3>
                    <input
                      type='text'
                      name='apellido'
                      placeholder='Apellido'
                      value={editedClient.apellido}
                      onChange={handleClientChange}
                      className='w-full p-2 mb-2'
                    />
                    <h3 className='font-bold text-lg'>Dni</h3>
                    <input
                      type='number'
                      name='dni'
                      placeholder='Dni'
                      value={editedClient.dni}
                      onChange={handleClientChange}
                      className='w-full p-2 mb-2'
                    />
                    <h3 className='font-bold text-lg'>Contacto</h3>
                    <input
                      type='text'
                      name='phone'
                      placeholder='Contacto'
                      value={editedClient.telcel}
                      onChange={handleClientChange}
                      className='w-full p-2 mb-2'
                    />
                    <h3 className='font-bold text-lg'>Email</h3>
                    <input
                      type='text'
                      name='email'
                      placeholder='Correo electronico'
                      value={editedClient.email}
                      onChange={handleClientChange}
                      className='w-full p-2 mb-2'
                    />
                    <h3 className='font-bold text-lg'>Domicilio</h3>
                    <input
                      type='text'
                      name='domicilio'
                      placeholder='Domicilio'
                      value={editedClient.direccion}
                      onChange={handleClientChange}
                      className='w-full p-2 mb-2'
                    />
                    <h3 className='font-bold text-lg'>Observaciones</h3>
                    <input
                      type='text'
                      name='observaciones'
                      placeholder='Observaciones'
                      value={editedClient.observaciones}
                      onChange={handleClientChange}
                      className='w-full p-2 mb-2'
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <div>
                    <div className='bg-gray-200 p-4'>
                      <h3 className='font-bold text-lg text-black'>
                        Nombre del cliente : <span>{client.nombre}</span>
                      </h3>
                      <h3 className='font-bold text-lg'>
                        Apellido del cliente: {client.apellido}
                      </h3>
                      <h3 className='font-bold text-lg'>DNI: {client.dni}</h3>
                    </div>
                    <div className='bg-blue-200 p-4'>
                      <h3>
                        Contacto :{' '}
                        <span className='font-bold text-sm text-black'>
                          {client.telcel}
                        </span>
                      </h3>
                      <h3>
                        email :{' '}
                        <p className='font-bold text-sm text-black'>
                          {client.email}
                        </p>
                      </h3>
                      <h3>
                        Domicilio :{' '}
                        <p className='font-bold text-sm text-black'>
                          {client.domicilio}
                        </p>
                      </h3>
                      <h3>
                        Observaciones :{' '}
                        <p className='font-bold text-sm text-black'>
                          {client.observaciones}
                        </p>
                      </h3>
                    </div>
                  </div>
                </div>
              </>
            )}
            <button
              onClick={editMode ? handleSave : handleEdit}
              className='bg-blue-500 text-white p-2 rounded'
            >
              {editMode ? 'Guardar' : 'Editar'}
            </button>
          </div>
        </div>
      );
}

export default InfoClientTab;