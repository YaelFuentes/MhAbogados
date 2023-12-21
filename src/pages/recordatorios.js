import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

moment.locale('es');

const localizer = momentLocalizer(moment);

const Recordatorios = () => {
    const [events, setEvents] = useState([]);
    const [newEvent, setNewEvent] = useState({ title: '', start: '', end: '' });
    const [modalOpen, setModalOpen] = useState(false);
    console.log(events)
    console.log(newEvent)
    const handleSelectSlot = ({ start, end }) => {
        setNewEvent({ title: '', start, end });
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    const handleInputChange = (e) => {
        setNewEvent({ ...newEvent, title: e.target.value });
    };

    const handleAddEvent = async (e) => {
        if (newEvent.title.trim() !== '') {
            const response = await axios.post('/api/')
            if (response.data !== null) {
                setEvents([...events, newEvent]);
                setModalOpen(false);
            } else {
                console.error('El servidor devolvió una respuesta nula.');
            }

        } else {
            alert('Por favor, ingresa un título para el recordatorio.');
        }
    };

    return (
        <div>
            <h1 className='font-bold m-2 text-xl text-center'>Calendario de recordatorios</h1>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                selectable
                onSelectSlot={handleSelectSlot}
                style={{ height: 500 }}
                formats={{
                    timeGutterFormat: 'HH:mm',
                    eventTimeRangeFormat: ({ start, end }, culture, local) =>
                        `${moment(start).format('HH:mm', culture)} - ${moment(end).format('HH:mm', culture)}`,
                    dayRangeHeaderFormat: ({ start, end }, culture, local) =>
                        `${moment(start).format('LL', culture)} - ${moment(end).format('LL', culture)}`,
                }}
            />
            <Modal open={modalOpen} onClose={handleModalClose}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <Typography variant="h6" component="div">
                        Agregar Recordatorio
                    </Typography>
                    <TextField
                        label="Texto del Recordatorio"
                        value={newEvent.title}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <Button onClick={handleAddEvent} variant="contained" sx={{ mt: 2 }}>
                        Agregar
                    </Button>
                </Box>
            </Modal>
        </div>
    );
};

export default Recordatorios;
