import {Button, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, Typography} from '@mui/material';

export default function ModalLGPD({
  open,
  onClose,
}: DialogProps) {
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle sx={{fontSize: 30}}>
        GBOEX
      </DialogTitle>
      <DialogContent>
        <Typography>
          O presente termo de adequação LGPD, tem como objetivo garantir a adequação da Empresa GBOEX à Lei Geral de Proteção de Dados ( Lei 13.709/2018). A GBOEX afirma que adota todas as medidas necessárias para assegurar a observância a LGPD, se compromete a manter a confidencialidade e a integridade de todos os dados pessoais mantidos ou consultados/transmitidos eletronicamente, para garantir a proteção desses dados contra acesso não autorizado, destruição, uso, modificação, divulgação ou perda acidental ou indevida. Para fins de clareza, os dados pessoais correspondem as informações relacionadas as pessoas naturais identificadas ou identificáveis.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          onClick={(event) => onClose && onClose(event, 'backdropClick')}
        >
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  )
}