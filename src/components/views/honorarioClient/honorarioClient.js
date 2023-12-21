import React, { useEffect, useState } from 'react';
import axios from 'axios'
import TableEdit from '@/components/flowbite/tableEdit';
import BasicModal from '@/components/mui/modal';
import Swal from 'sweetalert2';

const HonorariosCliente = ({ id }) => {

  const [honorarios, setHonorarios] = useState([])
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/expediente/expediente?id=${id}`);
        const data = response.data
        setHonorarios(data)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
    fetchData();
  }, [id])

  const handleSaveEdit = async (e) => {
    e.preventDefault()
    try {
      const dataId = selectedRow && selectedRow.idexpcliente ? selectedRow.idexpcliente : ''
      const response = await axios.put(`/api/expedienteCliente/ExpCliente?id=${dataId}`, formData);
      console.log(response)
      if (response.status === 200) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `Honorario modificado con exito`,
          showConfirmButton: false,
          timer: '1500',
          customClass: {
            container: 'z-[1500]'
          }
        })
        setTimeout(() => {
          location.reload();
        }, 2000);
      } else {
        Swal.fire({
          position: 'bottom-start',
          icon: 'error',
          title: 'Error al editar el Honorario, intentelo mas tarde',
          showConfirmButton: false,
          timer: '1500',
          customClass: {
            container: 'z-[1500]' // Ajusta este valor según sea necesario
          }
        })
      }
    } catch (error) {
      console.error('Error al guardar los cambios: ', error);
    }
  };

  const columnsTable = [
    { id: "idexp", label: 'ID expediente' },
    { id: "honoinicial", label: 'H. iniciales' },
    { id: "honofinal", label: 'H. finales' },
    { id: "honocamara", label: 'Otros' },
  ];

  const handleChange = ({ target }) => {
    setFormData((prevData) => ({
      ...prevData,
      [target.name]: target.value,
    }));
  };

  const handleRowClick = (row) => {
    setSelectedRow(row);
  };

  const buttons = [
    {
      button: <BasicModal
        nameButton={'Editar'}
        titleModal={`Honorario de expediente Nro. ${selectedRow && selectedRow.idexp ? selectedRow.idexp : ''}`}
        contentModal={
          <>
            <form onSubmit={handleSaveEdit} className='max-w-md mx-auto'>
              <div className='relative z-0 w-full mb-5 group'>
                <input
                  type="text"
                  id="honoinicial"
                  name="honoinicial"
                  placeholder=" "
                  value={formData.honoinicial}
                  onChange={handleChange}
                  className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                />
                <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Honorarios Iniciales
                </label>
              </div>
              <div className='relative z-0 w-full mb-5 mt-5 group'>

                <input
                  type="text"
                  id="honofinal"
                  placeholder=" "
                  name="honofinal"
                  value={formData.honofinal}
                  className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                  onChange={handleChange}
                />
                <label htmlFor="honofinal" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Honorarios Finales
                </label>
              </div>
              <div className='relative z-0 w-full mb-5 group'>
                <input
                  type="text"
                  id="honocamara"
                  name="honocamara"
                  value={formData.honocamara}
                  placeholder=" "
                  onChange={handleChange}
                  className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                />
                <label htmlFor="honocamara" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Otros Honorarios
                </label>
              </div>
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Guardar
              </button>
            </form>
          </>
        }
      />,
      onClick: (row) => {

        handleRowClick(row)
      }
    }
  ]

  return (
    <>
      <div className='w-full'>
        <div>
          <h1 className='font-bold m-2 text-center'>
            Honorarios generados para el cliente {honorarios?.getClientDni?.nombre} {honorarios?.getClientDni?.apellido}
          </h1>
          <TableEdit
            columns={columnsTable}
            rows={honorarios?.expCliente}
            buttons={buttons}
          />
        </div>
      </div>
    </>
  )

}
export default HonorariosCliente