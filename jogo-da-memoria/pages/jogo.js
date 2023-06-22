import { Grid, Button, Card, Paper } from '@mui/material'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import { imagesLength } from '../config/images'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import dynamic from 'next/dynamic'
import Modal from '../components/modal'

const fixedRandomSorts = () => {
  const sorts = []
  for (let i = 0; i < imagesLength; i++) {
    sorts.push(Math.random())
  }
  return sorts
}

const fixedIds = () => {
  const ids = []
  for (let i = 0; i < imagesLength*2; i++) {
    ids.push(uuidv4())
  }
  return ids
}

function Home() {
  const router = useRouter()

  const [lockBoard, setLockBoard] = useState(false)
  const [firstCardClicked, setFirstCardClicked] = useState({})
  const [secondCardClicked, setSecondCardClicked] = useState({})
  const [hasFlippedCard, setHasFlippedCard] = useState(false)
  const [imagesFound, setImagesFound] = useState([])
  const [sorts, setSorts] = useState(fixedRandomSorts())
  const [ids, setIds] = useState(fixedIds())
  const [showPopup, setShowPopup] = useState(false)

  const handleReset = () => {
    setFirstCardClicked({})
    setSecondCardClicked({})
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
      handleReset()
    }, 1500)
    return () => clearTimeout(timeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondCardClicked])

  useEffect(() => {
    if (imagesFound.length === imagesLength) {
      setShowPopup(true)
    }
  }, [imagesFound])

  const buildGrid = (first = true) => {
    const grid = []
    for (let i = 0; i < imagesLength; i++) {
      const imageName = `imagem${i+1}.jpg`
      const id = ids[first ? i : i + imagesLength]
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
            name={imageName}
            onClick={(event) => {
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
              src={`/imagens/${imageName}`}
              alt="Frente"
            />
            <Image
              className="back-face"
              width={200}
              height={200}
              src={`/imagens/capa.jpg`}
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
        handleReset={() => {
          setShowPopup(false)
          handleReset()
        }}
        handleCancel={() => router.push('/')}
        handleClose={() => setShowPopup(false)}
      />
      <Grid container sx={{
        margin: 'auto',
        padding: '5em',
        display: 'flex',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundImage: 'url(/imagens/background.jpg)',
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

export default dynamic(() => Promise.resolve(Home), {
  ssr: false
});
