import React, { useState, useEffect } from 'react'
import axios from 'axios'

const InfoClientTab = ({ id, statusObs }) => {

  const [client, setClient] = useState({});
  const [editedClient, setEditedClient] = useState({});
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/usuarios/userClient?id=${id}`);
        const data = response.data;
        setClient(data);
        setEditedClient(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

  const handleEdit = () => {
    setEditMode(true);
  }
  console.log(editedClient);

  const handleSave = async () => {
    try {
      const userDataWithoutPassword = { ...editedClient };
      delete userDataWithoutPassword.password;
      await axios.put(`/api/usuarios/userClient?id=${client.id}`, userDataWithoutPassword);
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
            <div class="grid lg:grid-cols-3 sm:grid-cols-12 gap-4">
              <div>
                <div className='mb-4'>
                  <label htmlFor='nombre' className='block text-lg font-bold mb-2'>Nombre</label>
                  <input
                    type='text'
                    name='name'
                    placeholder='Nombre'
                    value={editedClient.name ? editedClient.name : editedClient.nombre}
                    onChange={handleClientChange}
                    className='w-full p-2 mb-2 border border-gray-300 rounded'
                  />
                </div>
              </div>
              <div><div className='mb-4'>
                <label htmlFor='apellido' className='block text-lg font-bold mb-2'>Apellido</label>
                <input
                  type='text'
                  name='lastname'
                  placeholder='Apellido'
                  value={editedClient.lastname ? editedClient.lastname : editedClient.apellido}
                  onChange={handleClientChange}
                  className='w-full p-2 mb-2 border border-gray-300 rounded'
                />
              </div>
              </div>
              {/* <div>
                <div className='mb-4'>
                  <label htmlFor='dni' className='block text-lg font-bold mb-2'>DNI</label>
                  <input
                    type='number'
                    name='dni'
                    placeholder='DNI'
                    value={editedClient.dni}
                    onChange={handleClientChange}
                    className='w-full p-2 mb-2 border border-gray-300 rounded'
                  />
                </div>
              </div> */}
              <div>
                <div className='mb-4'>
                  <label htmlFor='phone' className='block text-lg font-bold mb-2'>Contacto</label>
                  <input
                    type='text'
                    name='cel'
                    placeholder='Contacto'
                    value={editedClient.telcel}
                    onChange={handleClientChange}
                    className='w-full p-2 mb-2 border border-gray-300 rounded'
                  />
                </div>
              </div>
              <div>
                <div className='mb-4'>
                  <label htmlFor='email' className='block text-lg font-bold mb-2'>Email</label>
                  <input
                    type='text'
                    name='email'
                    placeholder='Correo electrónico'
                    value={editedClient.email}
                    onChange={handleClientChange}
                    className='w-full p-2 mb-2 border border-gray-300 rounded'
                  />
                </div>
              </div>
              {/* <div>
                <div className='mb-4'>
                  <label htmlFor='domicilio' className='block text-lg font-bold mb-2'>Domicilio</label>
                  <input
                    type='text'
                    name='domicilio'
                    placeholder='Domicilio'
                    value={editedClient.direccion}
                    onChange={handleClientChange}
                    className='w-full p-2 mb-2 border border-gray-300 rounded'
                  />
                </div>
              </div> */}
            </div>
            <div>
              {statusObs == 1 ?
                <div className='p-4'>
                  <div className='mb-4'>
                    <label htmlFor='observaciones' className='block text-lg font-bold mb-2'>Observaciones</label>
                    <input
                      type='text'
                      name='observaciones'
                      placeholder='Observaciones'
                      value={editedClient.observaciones}
                      onChange={handleClientChange}
                      className='w-full p-2 mb-2 border border-gray-300 rounded'
                    />
                  </div>
                </div> :
                <></>}
            </div>
          </>
        ) : (
          <>
            <div>
              <div>
                <div class="grid lg:grid-cols-3 sm:grid-cols-12 gap-4">
                  <div><h3 className='font-bold m-2 text-xl '>
                    Nombre:
                    <br />
                    <span>{client.name ? client.name : client.nombre}</span>
                  </h3></div>
                  <div><h3 className='font-bold m-2 text-xl '>
                    Apellido:
                    <br />
                    {client.lastname ? client.lastname : client.apellido}
                  </h3></div>
                  <div><h3 className='font-bold m-2 text-xl '>DNI:
                    <br />
                    {client.dni}</h3></div>
                  <div><h3 className='font-bold m-2 text-xl '>
                    Contacto :{' '}
                    <br />
                    {client.telcel}
                  </h3></div>
                  <div><h3 className='font-bold m-2 text-xl '>
                    email :{' '}
                    <br />
                    {client.email}
                  </h3></div>
                  {/* <div><h3 className='font-bold m-2 text-xl '>
                    Domicilio :{' '}
                    <br />
                    {client.domicilio}
                  </h3></div> */}
                </div>
                {statusObs == 1 ?
                  <div>
                    <h3 className='font-bold m-2 text-xl '>
                      Observaciones :{' '}
                      <p className='font-bold text-sm text-black'>
                        {client.observaciones}
                      </p>
                    </h3>
                  </div> :
                  <></>}
              </div>
            </div>
          </>
        )}
        <button
          onClick={editMode ? handleSave : handleEdit}
          class="text-white bg-primary-10 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {editMode ? 'Guardar cambios' : 'Editar información'}
        </button>
      </div>
    </div>
  );
}

export default InfoClientTab;