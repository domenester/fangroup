import { Box } from "@mui/material";
import { useEffect, useState } from "react";

interface ITimer {
  duration: number,
  onTimeout: () => void,
  resetTimer: boolean
}

const getMinutesLabel = (seconds: number) => {
  const value = Math.floor(seconds/60)
  return `${value < 10 ? '0' : ''}${value}`
}

const getSecondsLabel = (seconds: number) => {
  const value = seconds%60
  return `${value < 10 ? '0' : ''}${value}`
}

export function Timer ({duration, onTimeout, resetTimer}: ITimer) {
  const [actualSecond, setActualSecond] = useState<number>(duration)
  const [minutes, setMinutes] = useState('00')
  const [seconds, setSeconds] = useState('00')

  useEffect(() => {
    const timer = setInterval(
      () => {
        console.log('timer on');
        setMinutes(
          getMinutesLabel(actualSecond)
        )
        setSeconds(
          getSecondsLabel(actualSecond)
        )

        if (actualSecond === 0) {
          clearInterval(timer)
          onTimeout()
          return
        }

        setActualSecond(actualSecond - 1)
      }, 1000
    )
    return () => clearInterval(timer)
  }, [actualSecond])

  useEffect(() => {
    setActualSecond(duration)
    setMinutes('00')
    setSeconds('00')
  }, [resetTimer])

  return (
    <Box sx={{
      margin: 'auto',
      backgroundColor: 'white',
      padding: 2,
      borderRadius: 5,
      fontSize: 40,
      fontWeight: 800
    }}>
      {minutes}:{seconds}
    </Box>
  )
}