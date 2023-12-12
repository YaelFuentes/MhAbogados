import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: '24px 24px 0px 0px rgba(0, 0, 0, 0.1)',
  p: 4,
  zIndex: 10,
};

export default function BasicModal({ nameButton, titleModal, contentModal, styled, onClose, onOpen }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
    if (onOpen) {
      onOpen();
    }
  }
  const handleClose = () => {
    setOpen(false);
    if (onClose) {
      onClose();
    }
  };
  const handleExited = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div>
      <Button onClick={handleOpen}>{nameButton}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        onExited={() => handleExited()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        container={() => document.body}

      >
        <Box sx={styled ? styled : style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" className='m-4 p-4 text-center font-bold text-2xl'>
            {titleModal}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} className='m-4 p-4'>
            {contentModal}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}