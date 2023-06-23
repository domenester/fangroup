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
  const [formData, setFormData] = useState({} as any)

  return (
    <Box sx={{
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
      <Grid container component={Paper} spacing={3} sx={{
        margin: 5,
        padding: 5,
        borderRadius: '1em',
      }}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label={'Nome: '}
            variant={'outlined'}
            value={formData.nome}
            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label={'Email: '}
            variant={'outlined'}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label={'Telefone: '}
            variant={'outlined'}
            value={formData.telefone}
            onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
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
            onClick={async () => {
              await fetch(
                '../api/register',
                {
                  method: 'POST',
                  headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(formData)
                }
              )
              router.push('/jogo-da-memoria/jogo')
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
            onClick={() => router.push('/jogo-da-memoria')}
          >
            Voltar
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}
