import { Grid, Button } from '@mui/material'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { initialConfig } from '../config/config'

const rootSx = {
  margin: 'auto',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  textAlign: 'center',
}

const buttonSx = {
  textTransform: 'none',
  fontSize: '3rem',
  width: '100%',
}

export default function Home() {
  const router = useRouter()
  const [config, setConfig] = useState({})

  useEffect(() => {
    if (localStorage) {
      const _config = JSON.parse(localStorage.getItem('fangroup_jogodamemoria_configuracao'))
      if (!_config) {
        return localStorage.setItem('fangroup_jogodamemoria_configuracao', JSON.stringify(initialConfig))
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
      backgroundImage: 'url(/imagens/background.jpg)',
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
            if (config.activateRegister) return router.push('/registro')
            return router.push('/jogo')
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
          onClick={() => router.push('/configuracao')}
        >
          Configurações
        </Button>
      </Grid>
    </Grid>
  )
}
