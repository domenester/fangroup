import {
  Grid,
  Button,
  TextField,
  Switch,
  Box,
  Paper,
  Typography
} from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import ModalLGPD from '../../components/modal-lgpd';

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
  const [formData, setFormData] = useState({lgpd: false, corretor: false} as any)

  const [activeInput, setActiveInput] = useState<string>('nome')

  const [keyboardLayoutName, setKeyboardLayoutName] = useState('default')

  const [capsOn, setCapsOn] = useState(false)

  const onKeyboardKeyPess = (input: string) => {
    if (input === '{shift}') {
      return setKeyboardLayoutName(
        keyboardLayoutName === 'default' ? 'shift' : 'default'
      )
    }

    if (input === '{lock}') {
      setCapsOn(!capsOn)
      return setKeyboardLayoutName(
        keyboardLayoutName === 'default' ? 'shift' : 'default'
      )
    }

    if (input === '{enter}') {
      return setActiveInput(({
        'nome': 'email',
        'email': 'telefone',
        'telefone': 'nome'
      } as any)[activeInput])
    }

    if (input === '{bksp}') {
      if (!formData[activeInput]) return
      return setFormData({ ...formData, [activeInput]: formData[activeInput].substring(0, formData[activeInput].length -1) })
    }

    if (input === '{space}') {
      return setFormData({ ...formData, [activeInput]: `${formData[activeInput]} ` })
    }

    setFormData({ ...formData, [activeInput]: `${formData[activeInput] || ''}${input}` })
    if (keyboardLayoutName === 'shift' && !capsOn) setKeyboardLayoutName('default')
  }

  const [openLgpd, setOpenLgpd] = useState(false)

  const verifyEmail = async () => {
    if (!formData.email) return
    const response = await fetch(
      '../api/verify-register',
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      }
    )
    const {alreadyRegistered} = await response.json()
    if (alreadyRegistered) {
      window.alert('Email já utilizado. Clique em Ok para Jogar.')
      router.push('/jogo-da-memoria/jogo')
    }
  }

  useEffect(() => {
    verifyEmail()
  }, [activeInput])

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
            label={'Email: '}
            variant={'outlined'}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            onClick={() => setActiveInput('email')}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label={'Nome: '}
            variant={'outlined'}
            value={formData.nome}
            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
            onClick={() => setActiveInput('nome')}
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
            onClick={() => setActiveInput('telefone')}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography>
            Corretor?
          </Typography>
          <Switch
            checked={formData.corretor}
            onChange={(e) => setFormData({ ...formData, corretor: e.target.checked || false })}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography>
            Aceitar termos LGPD?
          </Typography>
          <Switch
            checked={formData.lgpd}
            onChange={(e) => {
              if (e.target.checked) setOpenLgpd(true)
              setFormData({ ...formData, lgpd: e.target.checked || false })
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <div>
            <Keyboard
              layout={{
                default: [
                  "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
                  "q w e r t y u i o p [ ] \\",
                  "{lock} a s d f g h j k l ; ' {enter}",
                  "{shift} z x c v b n m , . / {shift}",
                  ".com @gmail.com @yahoo.com @hotmail.com @ {space}"
                ],
                shift: [
                  "~ ! @ # $ % ^ & * ( ) _ + {bksp}",
                  "Q W E R T Y U I O P { } |",
                  '{lock} A S D F G H J K L : " {enter}',
                  "{shift} Z X C V B N M < > ? {shift}",
                  ".com @gmail.com @yahoo.com @hotmail.com @ {space}"
                ]
              }}
              layoutName={keyboardLayoutName}
              onKeyPress={onKeyboardKeyPess}
            />
          </div>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="contained"
            color="primary"
            sx={{
              ...buttonSx,
              fontSize: '2em'
            }}
            onClick={async () => {
              if (formData.email) {
                await fetch(
                  '../api/register',
                  {
                    method: 'POST',
                    headers: {
                      'Accept': 'application/json, text/plain, */*',
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                      ...formData,
                      date: new Date(),
                    })
                  }
                )
              }
              router.push('/jogo-da-memoria/jogo')
            }}
          >
            Jogar
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="contained"
            color="primary"
            sx={{
              ...buttonSx,
              fontSize: '2em'
            }}
            onClick={() => router.push('/jogo-da-memoria/jogar')}
          >
            Voltar
          </Button>
        </Grid>
      </Grid>
      <ModalLGPD
        open={openLgpd}
        onClose={() => setOpenLgpd(false)}
      />
    </Box>
  )
}
