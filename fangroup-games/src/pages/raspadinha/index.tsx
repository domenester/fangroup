import { Grid, Button } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { scratchGameInitialConfig } from '@/config/initial'
import { getScratchGameConfig, setScratchGameConfig } from '../../config/localStorage'

export const buttonSx = {
  textTransform: 'none',
  fontSize: '3rem',
  width: '100%',
}

export default function Home() {
  const router = useRouter()
  const [config, setConfig] = useState({} as any)

  useEffect(() => {
    if (localStorage) {
      const _config = getScratchGameConfig()
      if (!_config) {
        return setScratchGameConfig(scratchGameInitialConfig)
      }
      setConfig(_config)
    }
  }, [])
  return (
    <Grid container sx={{
      margin: 'auto',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      textAlign: 'center',
      backgroundImage: 'url(/imagens/raspadinha/background.jpg)',
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
            if (config.activateRegister) return router.push('/raspadinha/registro')
            return router.push('/raspadinha/jogo')
          }}
        >
          Jogar
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          sx={buttonSx}
          onClick={() => router.push('/raspadinha/configuracao')}
        >
          Configurações
        </Button>
      </Grid>
    </Grid>
  )
}
