import { Grid, Button } from '@mui/material'
import { useRouter } from 'next/router'

export const buttonSx = {
  textTransform: 'none',
  fontSize: '3rem',
  width: '100%',
}

export default function Home() {
  const router = useRouter()

  return (
    <Grid container sx={{
      margin: 'auto',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      textAlign: 'center',
      backgroundImage: 'url(/imagens/background-fangroup.jpg)',
      width: '100%',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      position: 'absolute',
    }}>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          sx={buttonSx}
          onClick={() => {
            return router.push('/jogo-da-memoria/jogar')
          }}
        >
          Iniciar
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          sx={buttonSx}
          onClick={() => router.push('/jogo-da-memoria/configuracao')}
        >
          Configurações
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          sx={buttonSx}
          onClick={() => router.push('/jogo-da-memoria/informacoes')}
        >
          Informações
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          sx={buttonSx}
          onClick={() => router.push('/')}
        >
          Voltar
        </Button>
      </Grid>
    </Grid>
  )
}
