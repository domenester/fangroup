import {Box, Button, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, Modal as MuiModal, Typography} from '@mui/material';

export default function Modal({
  open,
  onClose,
  title,
  content,
  onCancel,
  onReset,
}: DialogProps & {
  onCancel: () => void;
  onReset: () => void;
}) {
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle sx={{fontSize: 30}}>
        {title}
      </DialogTitle>
      <DialogContent>
        {content}
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={onReset}>
          Jogar de Novo
        </Button>
        <Button variant="contained" color="secondary" onClick={onCancel}>
          Finalizar
        </Button>
      </DialogActions>
    </Dialog>
  )
}