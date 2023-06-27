import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { initialConfig } from '@/config/initial'
import { getMemoryGameConfig, setMemoryGameConfig } from '../config/localStorage'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    if (localStorage) {
      const _config = getMemoryGameConfig()
      if (!_config) {
        return setMemoryGameConfig(initialConfig)
      }
      router.push('/jogo-da-memoria')
    }
  }, [])
  return <div style={{height: '100em'}}>Carregando...</div>
}
