import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TableEdit from '@/components/flowbite/tableEdit';
import NavbarWeb from "./navbarWeb";
import BasicModal from '@/components/mui/modal';
import { Backdrop, CircularProgress } from '@mui/material';
import Loading from '@/components/mui/Loading';


function obtenerTextoPorIDFuerza(idFuerza) {
  switch (idFuerza) {
    case 0:
      return "EA - Ejército Argentino";
    case 1:
      return "ARA - Armada Argentina";
    case 2:
      return "FAA - Fuerza Aérea";
    case 3:
      return "GN - Gendarmería Nacional";
    case 4:
      return "P Fed - Policía Federal";
    case 5:
      return "SPF - Servicio Penitenciario Federal";
    case 6:
      return "PSA - Pol Seg. Aeroportuaria";
    case 7:
      return "PCI - Pers Civil Inteligencia";
    case 8:
      return "Sin especificar";
    case 9:
      return "Sin especificar";
    case 10:
      return "Sin Fuerza";
    default:
      return "Desconocido";
  }
}

function obtenerTextoPorSitRevista(sitRevista) {
  switch (sitRevista) {
    case 0:
      return "Actividad";
    case 1:
      return "Retiro";
    default:
      return "Desconocido";
  }
}


const RequestClient = () => {
  const [clientInfo, setClientInfo] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [showTable, setShowTable] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [loading, setLoading] = useState(false);
  const [movimientosDelExpediente, setMovimientosDelExpediente] = useState([]);

  const id = selectedRow && selectedRow.idexp ? selectedRow.idexp : '';
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/movimientos/movimientos?dni=${id}`)
        setMovimientosDelExpediente(response.data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false);
      }
    }
    fetchData()
  }, [selectedRow])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (clientInfo.trim() !== "") {
        const response = await axios.get(`/api/expediente/expediente?id=${clientInfo}`);
        if (response.data !== null) {
          setSearchResult(response.data);
          setShowTable(true);
        } else {
          console.error('El servidor devolvió una respuesta nula.');
        }
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClient = (e) => {
    setClientInfo(e.target.value);
  };

  const formatDate = (dateString) => {
    if (!dateString) {
      return 'Sin fecha colocada';
    }
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
    return formattedDate;
  }

  const columnsTable = [
    { id: "idexp", label: 'Expediente' },
    { id: "caratula", label: 'Caratula' },
    { id: "decretos", label: 'Decretos' },
    { id: "juzgasecret", label: 'Secretaría' },
  ];

  const contenidoEstilo = {
    textAlign: "center",
    color: "white",
    paddingTop: "15px",
    paddingBottom: '15px'
  };
  const columnsTableMovimientos = [
    { id: 'idexp', label: 'Nro Exp' },
    { id: 'tipomov', label: 'Movimiento' },
    { id: 'fecha', label: 'Fecha', format: (value) => formatDate(value) }
  ];

  const handleRowClick = (row) => {
    setSelectedRow(row);
  };

  const buttons = [
    {
      button: <BasicModal
        nameButton={'Ver movimientos'}
        titleModal={`Informacion del expediente Nro. ${selectedRow && selectedRow.idexp ? selectedRow.idexp : ''}
         Caratula. ${selectedRow && selectedRow.caratula ? selectedRow.caratula : ''}`}
        contentModal={
          <>
            <TableEdit
              rows={movimientosDelExpediente}
              columns={columnsTableMovimientos}
            />
          </>
        }
        styled={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '60%',
          maxHeight: '80vh',
          overflowY: 'auto',
          bgcolor: 'white',
          border: '2',
          borderColor: 'black',
          boxShadow: 'lg',
          p: '4',
        }}
      />,
      onClick: (row) => {
        handleRowClick(row)
      }
    }
  ]

  return (
    <>
      <NavbarWeb />
      <div style={contenidoEstilo}>
        <h1 className={`text-4xl font-bold mb-4 text-[#284285]`}>Formulario de consulta online</h1>
        <h3 className={`text-[#284285]`}>
          En este formulario podrás realizar un seguimiento de su causa y ver cada uno de los movimientos realizados por nuestro estudio de abogados
        </h3>
      </div>
      <div>
        <form
          className="max-w-md mx-auto mt-8"
          onSubmit={handleSubmit}
          aria-label="Formulario de búsqueda de cliente"
        >
          <div className="relative z-0 w-full mb-5 group"></div>
          <label htmlFor="clientInfo">Ingrese su número de documento:</label>
          <input
            id="clientInfo"
            name="clientInfo"
            type="number"
            value={clientInfo}
            onChange={handleClient}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 mb-3 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder="DNI..."
            required
          />
          <div>
            <button
              type="submit"
              className="w-full text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              {loading ? 'Buscar' : 'Buscar'}
            </button>
          </div>
        </form>

        {searchResult && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 ml-10 mr-10 p-10">
              <div className="bg-gray-100 p-4 rounded-md text-center">
                <p className="mb-2 text-center">Nombre</p>
                <div className="mx-4">
                  <h1>{searchResult.getClientDni.nombre}</h1>
                </div>
              </div>
              <div className="bg-gray-100 p-4 rounded-md text-center">
                <p className="mb-2 text-center">Apellido</p>
                <div className="mx-4">
                  <h1>{searchResult.getClientDni.apellido}</h1>
                </div>
              </div>
              <div className="bg-gray-100 p-4 rounded-md text-center">
                <p className="mb-2">Tipo De Fuerza</p>
                <div className="mx-4">
                  <h1>{obtenerTextoPorIDFuerza(searchResult.getClientDni.idfuerza)}</h1>
                </div>
              </div>
              <div className="bg-gray-100 p-4 rounded-md text-center">
                <p className="mb-2">Sit. Revista</p>
                <div className="mx-4">
                  <h1>{obtenerTextoPorSitRevista(searchResult.getClientDni.idrevista)}</h1>
                </div>
              </div>
            </div>
            <TableEdit
              columns={columnsTable}
              rows={searchResult.expedienteInfo}
              buttons={buttons}
            />
          </>
        )}
      </div>
    </>
  );
};

export default RequestClient;
