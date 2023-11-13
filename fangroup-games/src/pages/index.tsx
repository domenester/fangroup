import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { memoryGameInitialConfig, scratchGameInitialConfig } from '@/config/initial'
import { getMemoryGameConfig, setMemoryGameConfig, setScratchGameConfig } from '../config/localStorage'
import { Button, Grid } from '@mui/material'

export const buttonSx = {
  textTransform: 'none',
  fontSize: '3rem',
  width: '100%',
}

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    if (localStorage) {
      const _config = getMemoryGameConfig()
      if (!_config) {
        setMemoryGameConfig(memoryGameInitialConfig)
        setScratchGameConfig(scratchGameInitialConfig)
      }
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
      backgroundImage: 'url(/imagens/background-fangroup.jpeg)',
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
          onClick={() => router.push('/jogo-da-memoria')}
        >
          Jogo da Memória
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          sx={buttonSx}
          onClick={() => router.push('/raspadinha')}
        >
          Raspadinha
        </Button>
      </Grid>
    </Grid>
  )
}
