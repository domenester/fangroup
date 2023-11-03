import { Grid, Button, Chip } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { initialConfig } from '@/config/initial'
import { getMemoryGameConfig, setMemoryGameConfig } from '../../config/localStorage'
import { format } from 'date-fns'

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
        return setMemoryGameConfig(initialConfig)
      }
      setConfig(_config)
    }
  }, [])

  const [data, setData] = useState([])
  const [byDate, setByDate] = useState<{[key: string]: any[]}>({})
  useEffect(() => {
    const runAsync = async () => {
      const response = await fetch(
        '../api/get-register',
      )
      const {data} = await response.json()
      setData(data)
      const registerMappedByDate: any = {}
      data.forEach(
        (item: any) => {
          const date = format(new Date(item.date), 'dd/MM/yyyy')
          if (!registerMappedByDate[date]) {
            registerMappedByDate[date] = []
          }
          registerMappedByDate[date].push(item)
        }
      )
      setByDate(registerMappedByDate)
    }
    runAsync()
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
      {
        !!data.length ? (
          <>
            <Grid item xs={12} md={3}>
              <Chip
                label={`Jogos totais: ${data.length}`}
                color="primary"
                sx={{fontSize: 18}}
              />
            </Grid>
            {
              Object.keys(byDate).map(
                (key) => (
                  <Grid item xs={12} md={3} key={key}>
                    <Chip
                      label={`Dia ${key}: ${byDate[key].length}`}
                      color="primary"
                      sx={{fontSize: 18}}
                    />
                  </Grid>     
                )
              )
            }
          </>
        ) : (
          <Grid item xs={12}>
            <Chip
              label={'Nenhum registro encontrado'}
              color="primary"
              sx={{fontSize: 18}}
            />
          </Grid>
        )
      }
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
  )
}
