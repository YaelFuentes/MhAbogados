import React, { useState, useEffect } from 'react'
import axios from 'axios'
import TableEdit from '@/components/flowbite/tableEdit';
import BasicModal from '@/components/mui/modal';
import EditIcon from '@mui/icons-material/Edit';
import ButtonIcon from '@/components/mui/iconButton';
import InfoClientTab from '@/components/views/editInfoClient/editInfoClient';

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

const RequestClient = ({ user, dni }) => {
  const [dataClient, setDataClient] = useState([]);
  const [clientInfo, setClientInfo] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  console.log(dataClient)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/movimientos/movimientos?dni=${dni.username}`)
        const expResponse = await axios.get(`/api/expediente/expediente?dni=${dni.username}`)
        setDataClient(response.data)
        setClientInfo(expResponse.data)
      } catch (e) {
        console.error('Error al cargar los movimientos del cliente: ', e)
      }
    }
    fetchData()
  }, [dni]);


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
  const columnsTableMovimientos = [
    { id: 'idexp', label: 'Nro Exp' },
    { id: 'tipomov', label: 'Movimiento' },
    { id: 'fecha', label: 'Fecha', format: (value) => formatDate(value) }
  ];

  const handleRowClick = (row) => {
    setSelectedRow(row);
  };

  const filteredRows = dataClient
  .flatMap(array => array.filter(item => item.idexp === (selectedRow && selectedRow.idexp)))
  .sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
  const buttons = [
    {
      button: <BasicModal
        nameButton={'Ver movimientos'}
        titleModal={`Informacion del expediente Nro. ${selectedRow && selectedRow.idexp ? selectedRow.idexp : ''}
         Caratula. ${selectedRow && selectedRow.caratula ? selectedRow.caratula : ''}`}
        contentModal={
          <>
            <TableEdit
              rows={filteredRows ? filteredRows : []}
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
      <div className='text-center color-white pt-5 pb-2'>
        <h1 className={`text-4xl font-bold mb-4 text-[#284285]`}>Formulario de consulta online</h1>
        <h3 className={`text-[#284285]`}>
          En esta sección, podrá fácilmente editar su información personal, haciendo clic en el botón "Editar Información". Los campos disponibles para editar son el nombre, apellido, contacto y correo electrónico. Para ello, debe hacer click en el botón y actualizar la información, solo en caso de ser necesario
        </h3>
        <div className="pt-4 mt-4 w-full">
          <a href="/api/logout" className="text-white bg-red-600 px-4 py-2 rounded-md hover:bg-red-700 transition duration-300 ease-in-out inline-block">Cerrar sesión</a>
        </div>
      </div>
      {clientInfo && (
        <div>
          {dataClient && dataClient.length > 0 ? (
            <div className='p-4 m-4'>
              <InfoClientTab
                id={clientInfo.getClientDni[0].id ? clientInfo.getClientDni[0].id : null}
                statusObs={0}
              />
            </div>
            /* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 ml-10 mr-10 p-10">
             <div className="bg-gray-100 p-4 rounded-md text-center flex items-center justify-between">
                <div>
                  <p className="mb-2 text-center">Nombre</p>
                  <div className="flex items-center space-x-2">
                    <h1>{clientInfo.getClientDni.nombre}</h1>
                    <ButtonIcon icon={<EditIcon />} onClick={handleSubmit} />
                  </div>
                </div>
              </div>
              <div className="bg-gray-100 p-4 rounded-md text-center">
                <p className="mb-2 text-center">Apellido</p>
                <div className="mx-4">
                  <h1>{clientInfo.getClientDni.apellido}</h1>
                </div>
              </div>
              <div className="bg-gray-100 p-4 rounded-md text-center">
                <p className="mb-2 text-center">Telefono</p>
                <div className="mx-4">
                  <h1>{clientInfo.getClientDni.telcel}</h1>
                </div>
              </div>
              <div className="bg-gray-100 p-4 rounded-md text-center">
                <p className="mb-2 text-center">Email</p>
                <div className="mx-4">
                  <h1>{clientInfo.getClientDni.email}</h1>
                </div>
              </div>
              <div className="bg-gray-100 p-4 rounded-md text-center">
                <p className="mb-2">Tipo De Fuerza</p>
                <div className="mx-4">
                  <h1>{obtenerTextoPorIDFuerza(clientInfo.getClientDni.idfuerza)}</h1>
                </div>
              </div>
              <div className="bg-gray-100 p-4 rounded-md text-center">
                <p className="mb-2">Sit. Revista</p>
                <div className="mx-4">
                  <h1>{obtenerTextoPorSitRevista(clientInfo.getClientDni.idrevista)}</h1>
                </div>
              </div>
            </div> */
          ) : (
            <p className='text-center m-4 p-4 font-bold text-3xl'>No hay datos disponibles.</p>
          )}
        </div>
      )}
      <div>
        <TableEdit
          columns={columnsTable}
          rows={clientInfo.expedienteInfo}
          buttons={buttons}
        />
      </div>
    </>
  )
}
export default RequestClient;