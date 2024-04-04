import React, { useState, useEffect } from 'react'
import axios from 'axios'
import TableResponsive from '@/components/flowbite/table'
import SearchComponent from '@/components/fragments/searchComponent'

const ListExp = () => {
  const [expediente, setExpediente] = useState([])
  const [filteresUsers, setFilteredUsers] = useState(expediente)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/expediente/expediente')
        setExpediente(response.data)
      } catch (error) {
        console.error('Error al obtener los datos de expediente:', error)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    setFilteredUsers(expediente);
  }, [expediente])

  const handleSearch = (searchTerm) => {
    const searchTermsArray = searchTerm.toLowerCase().split(' ');

    if (searchTermsArray.length === 0) {
      setFilteredUsers(expediente);
      return;
    }

    const filtered = expediente.filter((item) =>
      searchTermsArray.every(term =>
        Object.values(item).some((value) =>
          value !== null && value.toString().toLowerCase().includes(term)
        )
      )
    );
    setFilteredUsers(filtered);
  };

  const columnsTable = [
    { id: "idexp", label: 'Nro de expediente' },
    { id: "caratula", label: 'Caratula' },
    { id: "juzgasecret", label: 'Juzgado' },
    { id: "decretos", label: 'decretos' },

  ];

  return (
    <>
      <div className="flex items-center justify-between px-10 m-4">
        <SearchComponent onSearch={handleSearch} />
      </div>
      <TableResponsive rows={filteresUsers} columns={columnsTable} routes={'expedienteInfo'}/>
    </>
  )
}
export default ListExp;