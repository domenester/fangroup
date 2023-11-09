import { Grid, Button, Switch, Box, Paper, Typography, TextField } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getMemoryGameConfig, getScratchGameConfig, setMemoryGameConfig, setScratchGameConfig } from '../../config/localStorage'

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
      const _config = getScratchGameConfig()
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
        <Grid item xs={12} md={3}>
          <Typography>
            Ativar Cadastro?
          </Typography>
          <Switch
            checked={config.activateRegister}
            onChange={(e) => setConfig({ ...config, activateRegister: e.target.checked })}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            label={'Dificuldade (de 0 a 100):'}
            value={config.difficulty}
            onChange={(e) => setConfig({ ...config, difficulty: +e.target.value })}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            label={'Frequência de vitórias:'}
            value={config.winOften}
            onChange={(e) => setConfig({ ...config, winOften: +e.target.value })}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            label={'Qtd de cartas: '}
            value={config.cardsOnTable}
            onChange={(e) => setConfig({ ...config, cardsOnTable: +e.target.value })}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setConfig({ ...config, cards: [...config.cards, {
              amount: 1,
              path: 'img1.png',
            }] })}
          >
            Adicionar Card
          </Button>
        </Grid>
        {
          (config.cards || []).map((card: any, index: number) => (
            <>
              <Grid item xs={12} md={4} key={`productName${index}`}>
                <TextField
                  label={'Nome do produto: '}
                  value={card.productName}
                  onChange={(e) => {
                    config.cards[index].productName = e.target.value
                    setConfig({ ...config, cards: config.cards })
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4} key={`amount${index}`}>
                <TextField
                  label={'Quantidade: '}
                  value={card.amount}
                  onChange={(e) => {
                    config.cards[index].amount = +e.target.value
                    setConfig({ ...config, cards: config.cards })
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4} key={`path${index}`} display='flex'>
                <TextField
                  label={'Nome do arquivo da imagem: '}
                  value={card.path}
                  onChange={(e) => {
                    config.cards[index].path = e.target.value
                    setConfig({ ...config, cards: config.cards })
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => {
                    config.cards.splice(index, 1)
                    setConfig({ ...config, cards: config.cards })
                  }}
                >
                  Remover
                </Button>
              </Grid>
            </>
          ))
        }
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            sx={buttonSx}
            onClick={() => {
              setScratchGameConfig({...config, gamesPlayed: 0})
              router.push('/raspadinha')
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
            onClick={() => router.push('/raspadinha')}
          >
            Voltar
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}
