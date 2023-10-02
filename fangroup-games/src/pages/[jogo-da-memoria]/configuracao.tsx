import { Grid, Button, Switch, Box, Paper, Typography, TextField } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getMemoryGameConfig, setMemoryGameConfig } from '../../config/localStorage'

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

export default function Configuracao() {
  const router = useRouter()
  const [config, setConfig] = useState({} as any)
  useEffect(() => {
    if (localStorage) {
      const _config = getMemoryGameConfig()
      if (_config) {
        setConfig(_config)
      }
    }
  }, [])
  return (
    <Box sx={{
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
      <Grid container component={Paper} spacing={3} sx={{
        margin: 5,
        padding: 5
      }}>
        <Grid item xs={12} md={6}>
          <Typography>
            Ativar Cadastro?
          </Typography>
          <Switch
            checked={config.activateRegister}
            onChange={(e) => setConfig({ ...config, activateRegister: e.target.checked })}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label={'Tempo do cronômetro (segundos):'}
            value={config.timer}
            onChange={(e) => setConfig({ ...config, timer: e.target.value })}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            sx={buttonSx}
            onClick={() => {
              setMemoryGameConfig({
                ...localStorage,
                ...config,
              })
              router.push('/jogo-da-memoria')
            }}
          >
            Salvar
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            sx={buttonSx}
            onClick={() => router.push('/jogo-da-memoria')}
          >
            Voltar
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}
