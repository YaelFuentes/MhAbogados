import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Swal from 'sweetalert2';
import moment from 'moment';
import TableEdit from '@/components/flowbite/tableEdit';
import BasicModal from '@/components/mui/modal';
import ExpedienteTableCliente from '@/components/fragments/expCliente';

const IdExpediente = () => {
  const router = useRouter();
  const expedienteId = router.query.id;
  const [expediente, setExpediente] = useState([]);
  const [formData, setFormData] = useState({
    fecha: moment().format('YYYY-MM-DD'),
    tipomov: '',
    detalles: '',
    idexp: expedienteId
  });
  console.log(formData)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseExp = await axios.get(`/api/movimientos/movimientos?mov=${expedienteId}`);
        const expedienteData = responseExp.data.map(item => ({
          idexp: item.idexp,
          fecha: moment(item.fecha).format('DD/MM/YYYY'),
          tipomov: item.tipomov,
          detalles: item.detalles
        }));
        setExpediente(expedienteData);
        setLoading(false);
      } catch (error) {
        console.error('Error al cargar los datos: ', error);
        setLoading(false);
      }
    };
    fetchData();
  }, [expedienteId]); // Asegúrate de que la carga se dispare al cambiar el ID del expediente

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/movimientos/movimientos?id=${expedienteId}`, formData);
      if (response.status === 201) {
        const updatedExpediente = [
          ...expediente,
          {
            idexp: response.data.idexp,
            fecha: moment(response.data.fecha).format('DD/MM/YYYY'),
            tipomov: formData.tipomov,
            detalles: formData.detalles
          }
        ];
        setExpediente(updatedExpediente);

        Swal.fire({
          position: 'bottom-start',
          icon: 'success',
          title: 'Movimiento generado con éxito',
          showConfirmButton: false,
          timer: '1500'
        });

        // Reiniciar el formulario después de agregar el movimiento
        setFormData({
          fecha: moment().format('YYYY-MM-DD'),
          tipomov: '',
          detalles: '',
          idexp: expedienteId
        });
      } else {
        Swal.fire({
          position: 'bottom-start',
          icon: 'error',
          title: 'Error al crear un movimiento, inténtelo más tarde',
          showConfirmButton: false,
          timer: '1500'
        });
      }
    } catch (error) {
      console.error('Error al modificar los datos: ', error);
    }
  };

  const columnsTable = [
    { id: 'idexp', label: 'Id exp' },
    { id: 'fecha', label: 'Fecha' },
    { id: 'tipomov', label: 'Movimiento' },
    { id: 'detalles', label: 'Detalles' }
  ];

  const handleRowClick = (row) => {
    // Manejar clic en fila si es necesario
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <>
      <div className="p-2 m-2">
        <div className="font-bold text-2xl text-center">
          Agregar Movimientos directos al expediente
        </div>
        <div className="mt-4 mb-4 text-center">
          Advertencia: Al cargar un movimiento directo al expediente se verán reflejados en todos los clientes asociados a ese expediente.
        </div>
        <form class="max-w-md mx-auto" onSubmit={handleSubmit}>
          <div class="relative z-0 w-full mb-5 group mt-10">
            <input
              type="text"
              name="tipomov"
              id="tipomov"
              onChange={handleChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Tipo de movimiento</label>
            <div className="relative z-0 w-full mt-5 group">
              <input
                type="text"
                name="detalles"
                id="detalles"
                onChange={handleChange}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Detalle (opcional)</label>
            </div>
            <div className="relative z-0 w-full mb-5 group mt-7">
              <input
                type="text"
                name="fecha"
                id="fecha"
                onChange={handleChange}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder="Fecha"
                value={formData.fecha}
                required
              />
              <label htmlFor="fecha" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Fecha</label>
            </div>
          </div>
          <div className='text-center p-5'>
            <button type="submit" class="text-white bg-primary-10 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Agregar movimiento</button>
          </div>
        </form>
        <div className='grid grid-cols-2'>
          <div className='m-2 p-2'>
            <h1 className="font-bold m-2 text-xl text-center">Historial de movimientos</h1>
            <TableEdit rows={expediente} columns={columnsTable} onClickRow={handleRowClick} />
          </div>
          <div className='m-2 p-2'>
            <h1 className='font-bold m-2 text-xl text-center'>Clientes con el expediente nro: {expedienteId}</h1>
            <ExpedienteTableCliente exp={expedienteId} />
          </div>
        </div>
        {/* <div>
          <h1 className="font-bold m-2 text-xl text-center">Historial de movimientos</h1>
          <TableEdit rows={expediente} columns={columnsTable} onClickRow={handleRowClick} />
        </div>
        <div>
          <h1 className='font-bold m-4 text-xl text-center'>Clientes con el expediente nro: {expedienteId}</h1>
          <ExpedienteTableCliente exp={expedienteId} />
        </div> */}
      </div>
    </>
  );
};

export default IdExpediente;
