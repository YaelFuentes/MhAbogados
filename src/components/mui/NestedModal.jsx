import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function ChildModal({ nameButton, titleChildModal, textChildModal, nameButtonClose }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button onClick={handleOpen}>{nameButton}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 200 }}>
          <h2 id="child-modal-title">{titleChildModal}</h2>
          <p id="child-modal-description">
            {textChildModal}
          </p>
          <Button onClick={handleClose}>{nameButtonClose}</Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default function NestedModal({
  nameButton,
  titleModal,
  textModal,
  nameButtonChildModal, //opcional solo si enableChildModal es true
  titleChild, //opcional solo si enableChildModal es true
  textChild, //opcional solo si enableChildModal es true 
  nameCloseChild, //opcional solo si enableChildModal es true
  enableChildModal //colocar en true solo si queremos doble modal
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleOpen}>{nameButton}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="parent-modal-title">{titleModal}</h2>
          <p id="parent-modal-description">
            {textModal}
          </p>
          {enableChildModal && ( // Renderiza ChildModal solo si enableChildModal es true
            <ChildModal
              nameButton={nameButtonChildModal}
              titleChildModal={titleChild}
              textChildModal={textChild}
              nameButtonClose={nameCloseChild}
            />
          )}
        </Box>
      </Modal>
    </div>
  );
}