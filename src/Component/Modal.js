import React from 'react';
import { Modal as UIModal, Box, Typography, Button } from '@mui/material';
const Modal = ({ open, onClose, title, children, onSubmit, submitText = 'Submit' }) => {
  return (
    <UIModal open={open} onClose={onClose}>
      <Box sx={{position: 'absolute',top: '50%',left: '50%',transform: 'translate(-50%, -50%)',width: 400,bgcolor: 'background.paper',boxShadow: 24,p: 4,}}>
        <Typography variant="h6" component="h2">{title}</Typography>
        {children}
        <Button onClick={onSubmit}variant="contained"color="primary"sx={{ mt: 2 }}>{submitText}</Button>
      </Box>
    </UIModal>
  );
};
export default Modal;
