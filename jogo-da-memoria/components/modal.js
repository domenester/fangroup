import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Modal as MuiModal, Typography} from '@mui/material';

export default function Modal({
  open,
  handleClose,
  title,
  content,
  handleCancel,
  handleReset,
}) {
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle sx={{fontSize: 30}}>
        {title}
      </DialogTitle>
      <DialogContent>
        {content}
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={handleReset}>
          Jogar de Novo
        </Button>
        <Button variant="contained" color="secondary" onClick={handleCancel}>
          Finalizar
        </Button>
      </DialogActions>
    </Dialog>
  )
}