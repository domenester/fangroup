import { Button, Grid } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Modal from '@/components/modal'
import { buttonSx } from '.'
import { getScratchGameConfig, setScratchGameConfig } from '../../config/localStorage'
import CardToScratch from './card'
import { IScratchCard } from '../../config/initial'

function shuffle(a: any[]) {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export const randomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

function Jogo() {
  const router = useRouter()

  const [showPopup, setShowPopup] = useState(false)
  const [cards, setCards] = useState([])
  const [imageNameScratching, setImageNameScratching] = useState(false);
  const [config, setConfig] = useState({} as any)

  useEffect(() => {
    if (localStorage) {
      const _config = getScratchGameConfig()
      if (_config) {
        setConfig(_config)
      }
    }
  }, [])

  useEffect(() => {
    const runAsync = async () => {
      const response = await fetch(
        '../api/scratch',
      )
      const {cards: _cards} = await response.json()
      setCards(_cards)
    }
    runAsync()
  }, [])

  const successTitle = 'Parabéns, você finalizou o jogo!'
  const loseTitle = 'Não foi dessa vez!'
  const stockOut = 'Sem prêmios no stoque.'

  const [modalTitle, setModalTitle] = useState(successTitle)
  const [randomSuccessCardIndex, setRandomSuccessCardIndex] = useState<any>()
  const [successCard, setSuccessCard] = useState<IScratchCard>()

  useEffect(() => {
    if (Object.keys(config).length > 0) {
      if (!config.cards.find((card: any) => card.amount > 0)) {
        setShowPopup(true)
        return setModalTitle(stockOut)
      }
      if (((config.gamesPlayed + 1) % config.winOften) === 0) {
        setRandomSuccessCardIndex(randomInt(0, config.cardsOnTable - 1))
        setSuccessCard(
          shuffle(config.cards).find((card: any) => card.amount > 0)
        )
      } else {
        setRandomSuccessCardIndex(undefined)
        setSuccessCard(undefined)
      }
    }
  }, [config])

  const [cardsScratched, setCardsScratched] = useState<any[]>([])

  useEffect(() => {
    if (successCard && cardsScratched.includes(successCard?.path)) {
      setModalTitle(`Parabéns, você ganhou um(a) ${successCard?.productName}!`)
      return setShowPopup(true)
    }
    if (cardsScratched.length === config.cardsOnTable) {
      setModalTitle(loseTitle)
      setShowPopup(true)
    }
  }, [cardsScratched])

  const renderCards = () => {
    const cardsGrid = []
    for (let index = 0; index < config.cardsOnTable; index++) {
      cardsGrid.push(
        <Grid
          item 
          xs={12}
          md={3}
          sm={4}
          key={index}
          display='flex'
        >
          <CardToScratch
            backCardPath={
              randomSuccessCardIndex === index ? successCard?.path : `wrong-card-${index}`
            }
            imageNameScratching={imageNameScratching}
            setImageNameScratching={setImageNameScratching}
            cardsScratched={cardsScratched}
            setCardsScratched={setCardsScratched}
            finishPercent={config.difficulty}
          />
        </Grid>
      )
    }
    return cardsGrid
  }

  const onModalClose = (reload = true) => {
    let cards = config.cards
    if (successCard) {
      cards = cards.map((card: any) => {
        if (card.path === successCard?.path) {
          card.amount = card.amount - 1
        }
        return card
      })
    }
    setScratchGameConfig({
      ...config,
      gamesPlayed: (config.gamesPlayed + 1) || 0,
      cards
    })
    setShowPopup(false)
    if (reload) setTimeout(() => router.push('/raspadinha/jogar'), 500)
  }

  return (
    <>
      <Modal
        open={showPopup}
        title={modalTitle}
        onReset={() => onModalClose()}
        onCancel={() => {
          onModalClose(false)
          setTimeout(() => router.push('/raspadinha/jogar'), 500)
        }}
        onClose={(event, reason) => {
          if (reason && reason == "backdropClick") return;
          onModalClose()
        }}
      />
      <Button
        variant='contained'
        sx={buttonSx}
        onClick={() => router.push('/raspadinha/jogar')}
      >
        Voltar
      </Button>
      <Grid container spacing={3} sx={{
        margin: 'auto',
        padding: '5em',
        paddingTop: '2em',
        minHeight: '100vh',
        height: '100%',
        backgroundImage: 'url(/imagens/raspadinha/background.jpeg)',
        width: '100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        justifyContent: 'center',
      }}>
        {
          renderCards()
        }
      </Grid>
    </>
  )
}

export default dynamic(() => Promise.resolve(Jogo), {
  ssr: false
});
