import Image from 'next/image';
import React, { useRef }  from 'react';
import ScratchCard from 'react-scratchcard-v2/dist';
import imageSrc from '../../../public/imagens/raspadinha/capa.jpeg';

export default function CardToScratch({
  backCardPath,
  imageNameScratching,
  setImageNameScratching,
  cardsScratched,
  setCardsScratched,
  finishPercent
}: any) {
  //@ts-ignore-entire-file
  const SC = ScratchCard.default;
  const [finished, setFinished] = React.useState(false);
  const [started, setStarted] = React.useState(false);
  return (
    <div
      onMouseDown={() => {
        if (imageNameScratching) return
        setStarted(true)
        setImageNameScratching(backCardPath || 'wrong-card')
      }}
      style={{
        height: '200px',
        margin: 'auto'
      }}
    >
      {
        !imageNameScratching || imageNameScratching === backCardPath || finished ? (
          <>
            <SC
              width={200}
              height={200}
              image={imageSrc.src}
              finishPercent={finishPercent}
              onComplete={() => {
                setFinished(true);
                setImageNameScratching();
                setCardsScratched([...cardsScratched, backCardPath]);
              }}
            >
              {
                (
                  !backCardPath.includes('wrong-card') ? (
                    <Image
                      src={`/imagens/raspadinha/cards/${backCardPath}?now=${(new Date()).getDate()}`}
                      alt={backCardPath}
                      width={200}
                      height={200}
                    />      
                  ) : (
                    <Image
                      src={`/imagens/raspadinha/ops.gif?now=${(new Date()).getDate()}`}
                      alt={backCardPath}
                      width={200}
                      height={200}
                    /> 
                  )
                )
              }
            </SC>
            {
              !started && (
                <Image
                  src={'/imagens/raspadinha/capa.png'}
                  alt={'capa'}
                  width={200}
                  height={200}
                  style={{
                    bottom: '200px',
                    position: 'relative',
                    zIndex: -1,
                  }}
                  priority
                />   
              )
            }
          </>
        ) : backCardPath ? (
          <Image
            src={'/imagens/raspadinha/capa.jpeg'}
            alt={'capa'}
            width={200}
            height={200}
            priority
          />
        ) : <></>
      }
    </div>
  );
};
