import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TableResponsive from '@/components/flowbite/table';
import SearchComponent from '@/components/fragments/searchComponent';

const HomePage = ({ user }) => {

  const [users, setUsers] = useState([])
  const [filteresUsers, setFilteredUsers] = useState(users)

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

  useEffect(() => {
    setFilteredUsers(users);
  }, [users])

  const handleSearch = (searchTerm) => {
    const searchTermsArray = searchTerm.toLowerCase().split(' ');

    if (searchTermsArray.length === 0) {
      setFilteredUsers(users);
      return;
    }

    const filtered = users.filter((item) =>
      searchTermsArray.every(term =>
        Object.values(item).some((value) =>
          value !== null && value.toString().toLowerCase().includes(term)
        )
      )
    );

    setFilteredUsers(filtered);
  };

  const columnsTable = [
    { id: "nombre", label: 'Nombre' },
    { id: "apellido", label: 'Apellido' },
    { id: "dni", label: 'DNI' },
    { id: "telcel", label: 'Contacto' },
    { id: "email", label: 'Correo Electrónico' },
    { id: "domicilio", label: 'Domicilio' },
  ];

  return (
    <>
      <div>
        <h1 className="container mx-auto my-4 text-xl font-bold ">Bienvenido, {user.username}</h1>
        {<TableResponsive rows={users} columns={columnsTable} routes={'clientInfo'} />}
      </div>
    </>
  );
}

export default HomePage;