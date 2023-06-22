import { Grid, Button, TextField, Switch, Box, Paper, Typography } from '@mui/material'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

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
  const [config, setConfig] = useState({})
  useEffect(() => {
    console.log('localStorage: ', localStorage);
    if (localStorage) {
      const _config = JSON.parse(localStorage.getItem('fangroup_jogodamemoria_configuracao'))
      console.log('_config: ', _config);
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
      backgroundImage: 'url(/imagens/background.jpg)',
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
        <Grid item xs={12}>
          <TextField
            label={'Quantidade de Cartões: '}
            variant={'outlined'}
            value={config.imagesLength}
            onChange={(e) => setConfig({ ...config, imagesLength: e.target.value })}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography>
            Ativar Cadastro?
          </Typography>
          <Switch
            label={'Ativar cadastro: '}
            checked={config.activateRegister}
            onChange={(e) => setConfig({ ...config, activateRegister: e.target.checked })}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            sx={buttonSx}
            onClick={() => {
              localStorage.setItem('fangroup_jogodamemoria_configuracao', JSON.stringify({
                ...localStorage,
                ...config,
              }))
              router.push('/')
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
            onClick={() => router.push('/')}
          >
            Voltar
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}
