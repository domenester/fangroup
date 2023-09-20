import { Grid, Button } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { memoryGameInitialConfig } from '@/config/initial'
import { getMemoryGameConfig, setMemoryGameConfig } from '../../config/localStorage'

const rootSx = {
  margin: 'auto',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  textAlign: 'center',
}

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
      const _config = getMemoryGameConfig()
      if (!_config) {
        return setMemoryGameConfig(memoryGameInitialConfig)
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
      backgroundImage: 'url(/imagens/jogo-da-memoria/background.jpg)',
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
            if (config.activateRegister) return router.push('/jogo-da-memoria/registro')
            return router.push('/jogo-da-memoria/jogo')
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
          onClick={() => router.push('/jogo-da-memoria/configuracao')}
        >
          Configurações
        </Button>
      </Grid>
    </Grid>
  )
}
