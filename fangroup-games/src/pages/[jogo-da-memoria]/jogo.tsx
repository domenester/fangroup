import { Grid, Button, Card, Paper } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import dynamic from 'next/dynamic'
import Modal from '@/components/modal'

const fixedRandomSorts = (cardsLength: number) => {
  const sorts = []
  for (let i = 0; i < cardsLength * 2; i++) {
    sorts.push(Math.random())
  }
  return sorts
}

const fixedIds = (cardsLength: number) => {
  const ids = []
  for (let i = 0; i < cardsLength*2; i++) {
    ids.push(uuidv4())
  }
  return ids
}

interface ICardClicked {
  id: string
  name: string
}

function Jogo() {
  const router = useRouter()

  const [lockBoard, setLockBoard] = useState(false)
  const [firstCardClicked, setFirstCardClicked] = useState({} as ICardClicked)
  const [secondCardClicked, setSecondCardClicked] = useState({} as ICardClicked)
  const [hasFlippedCard, setHasFlippedCard] = useState(false)
  const [imagesFound, setImagesFound] = useState([] as string[])
  const [sorts, setSorts] = useState([] as number[])
  const [ids, setIds] = useState([] as string[])
  const [showPopup, setShowPopup] = useState(false)

  const [cards, setCards] = useState([])

  useEffect(() => {
    if (cards.length) {
      setSorts(fixedRandomSorts(cards.length))
      setIds(fixedIds(cards.length))
    }
  }, [cards])
  useEffect(() => {
    const runAsync = async () => {
      const response = await fetch(
        '../api/memory-cards',
      )
      const {cards: _cards} = await response.json()
      setCards(_cards)
    }
    runAsync()
  }, [])

  const handleReset = async () => {
    unflipCards()
    setImagesFound([])
    const waitUnflip = setTimeout(() => {
      setSorts(fixedRandomSorts(cards.length))
      clearTimeout(waitUnflip)
    }, 500)
  }

  const unflipCards = () => {
    setFirstCardClicked({} as any)
    setSecondCardClicked({} as any)
    setLockBoard(false)
    setHasFlippedCard(false)
  }

  useEffect(() => {
    if (!secondCardClicked.id) return
    setLockBoard(true)
    const timeout = setTimeout(() => {
      if (firstCardClicked.name === secondCardClicked.name) {
        setImagesFound([
          ...imagesFound,
          firstCardClicked.name,
        ])
      }
      unflipCards()
    }, 1500)
    return () => clearTimeout(timeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondCardClicked])

  useEffect(() => {
    if (cards.length > 0 && imagesFound.length === cards.length) {
      setShowPopup(true)
    }
  }, [imagesFound])

  const buildGrid = (first = true) => {
    const grid = []
    for (let i = 0; i < cards.length; i++) {
      const imageName = cards[i]
      const id = ids[first ? i : i + cards.length]
      grid.push(
        <Grid item xs={12} sm={4} sx={{display: 'flex', alignItems: 'center'}}>
          <div
            id={id}
            className={`
              memory-card
              ${
                firstCardClicked.id === id ||
                secondCardClicked.id === id ||
                imagesFound.includes(imageName) ?
                'flip' :  ''
              }
            `}
            onClick={(event) => {
              // @ts-ignore
              const id = event.target.parentNode.id
              if (
                lockBoard ||
                firstCardClicked.id === id ||
                imagesFound.includes(imageName)
              ) return
              if (!hasFlippedCard) {
                setHasFlippedCard(true)
                return setFirstCardClicked({ id, name: imageName })
              }
              return setSecondCardClicked({ id, name: imageName })
            }}
          >
            <Image
              className="front-face"
              width={200}
              height={200}
              src={`/imagens/jogo-da-memoria/cards/${imageName}`}
              alt="Frente"
            />
            <Image
              className="back-face"
              width={200}
              height={200}
              src={`/imagens/jogo-da-memoria/capa.jpg`}
              alt="Capa"
            />
          </div>
        </Grid>
      )
    }
    return grid
  }

  const renderGrid = () => {
    return [
      ...buildGrid(),
      ...buildGrid(false),
    ]
      .map((value, index) => ({ value, sort: sorts[index] }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)
  }

  return (
    <>
      <Modal
        open={showPopup}
        title={'Parabéns, você finalizou o jogo!'}
        onReset={() => {
          setShowPopup(false)
          handleReset()
        }}
        onCancel={() => router.push('/jogo-da-memoria')}
        onClose={() => setShowPopup(false)}
      />
      <Grid container sx={{
        margin: 'auto',
        padding: '5em',
        display: 'flex',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundImage: 'url(/imagens/jogo-da-memoria/background.jpg)',
        width: '100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}>
        {
          renderGrid()
        }
      </Grid>
    </>
  )
}

export default dynamic(() => Promise.resolve(Jogo), {
  ssr: false
});
