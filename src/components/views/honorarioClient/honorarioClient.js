import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { useRouter } from 'next/router';
import TableEdit from '@/components/flowbite/tableEdit';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const HonorariosCliente = ({ id }) => {

  const [honorarios, setHonorarios] = useState([])
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState([]);
  const [editingHonorario, setEditingHonorario] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  console.log(honorarios)

  useEffect(() => {
    console.log('ID:', id);
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

  const handleEditClick = (honorario) => {
    setEditingHonorario(honorario);
    setFormData({
      honoinicial: honorario.honoinicial,
      honofinal: honorario.honofinal,
      honocamara: honorario.honocamara,
    });
    setOpenModal(true);
    setFormData((prevData) => ({ ...prevData, idexpCliente: honorario.idexpcliente }));
  };

  const handleCancelEdit = () => {
    setFormData({ honoinicial: '', honofinal: '', honocamara: '' });
    setEditingHonorario(null);
  };

  const handleSaveEdit = async () => {
    try {
      const updatedHonorario = {
        idexpCliente: editingHonorario.idexpcliente,
        honoinicial: formData.honoinicial,
        honofinal: formData.honofinal,
        honocamara: formData.honocamara,
      };
      const response = await axios.put(`/api/expedienteCliente/ExpCliente?id=${formData.idexpCliente}`, updatedHonorario);
      if (response.status === 200) {
        console.log('Honorarios guardados con éxito');
        const updatedExpCliente = honorarios.expCliente.map((h) =>
          h.idexp === updatedHonorario.idexp ? { ...h, ...updatedHonorario } : h
        );
        setHonorarios((prevHonorarios) => ({ ...prevHonorarios, expCliente: updatedExpCliente }));
      } else {
        console.error(response.data.error);
      }
    } catch (error) {
      console.error('Error al guardar los cambios: ', error);
    }

    setEditingHonorario(null);
    setFormData({ honoinicial: '', honofinal: '', honocamara: '' });
    setOpenModal(false);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const columnsTable = [
    { id: "idexp", label: 'ID expediente' },
    { id: "honoinicial", label: 'Honorarios iniciales' },
    { id: "honofinal", label: 'Honorarios finales' },
    { id: "honocamara", label: 'Otros honorarios' },
    { id: "editar", label: 'Editar' }
  ];

  const handleChange = ({ target }) => {
    setFormData((prevData) => ({
      ...prevData,
      [target.name]: target.value,
    }));
  };

  return (
    <>
      <div className='w-full'>
        <div>
          <h1 className='font-bold m-2 text-xl text-center'>
            Honorarios generados para el cliente {honorarios?.getClientDni?.nombre} {honorarios?.getClientDni?.apellido}
          </h1>
          <TableEdit
            columns={columnsTable}
            rows={honorarios?.expCliente}
            editButtonComponent={{ onEditClick: handleEditClick, button: 'Editar' }}
          />
        </div>
      </div>
      {editingHonorario && (
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', p: 2 }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Editar Honorario
            </Typography>
            <form onSubmit={(e) => { e.preventDefault(); handleSaveEdit(); }}>
              <div>
                <label htmlFor="honoinicial">Honorarios Iniciales:</label>
                <input
                  type="text"
                  id="honoinicial"
                  name="honoinicial"
                  value={formData.honoinicial}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="honofinal">Honorarios Finales:</label>
                <input
                  type="text"
                  id="honofinal"
                  name="honofinal"
                  value={formData.honofinal}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="honocamara">Otros Honorarios:</label>
                <input
                  type="text"
                  id="honocamara"
                  name="honocamara"
                  value={formData.honocamara}
                  onChange={handleChange}
                />
              </div>
              <button type="button" onClick={handleCancelEdit}>
                Cancelar
              </button>
              <button type="submit">Guardar</button>
            </form>
          </Box>
        </Modal>
      )}
    </>
  )

}
export default HonorariosCliente