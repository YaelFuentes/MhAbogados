import SearchTable from '@/components/flowbite/table';
import Tabs from '@/components/flowbite/tabs';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TableResponsive from '@/components/flowbite/table';

const HomePage = ({ user }) => {

  const [users, setUsers] = useState([])

  console.log(users)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/cliente/cliente/');
        setUsers(response.data);
      } catch (error) {
        console.log('Error al traer la tabla de clientes', error);
      }
    };

    fetchData();
  }, []);

  const columnsTable = [
    { id: "nombre", label: 'Nombre' },
    { id: "apellido", label: 'Apellido' },
    { id: "dni", label: 'DNI' },
    { id: "telcel", label: 'Contacto' },
    { id: "email", label: 'Correo Electrónico' },
    { id: "domicilio", label: 'Domicilio' },
    { id: "domicilio", label: 'Domicilio' },
  ];

  return (
    <>
      <div>
        <h1>Hola {user.username}, bienvenido.</h1>
        {<TableResponsive rows={users} columns={columnsTable} routes={'products'}/>}
      </div>
    </>
  );
}

export default HomePage;