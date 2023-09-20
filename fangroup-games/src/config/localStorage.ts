import { memoryGameInitialConfig, scratchGameInitialConfig } from "./initial"

const prefixes = {
  global: 'fangroup_',
  memoryGameConfig: 'jogodamemoria_configuracao',
  scratchGameConfig: 'raspadinha_configuracao',
}

export const getData = (key: string) => {
  const item = localStorage.getItem(`${prefixes.global}${key}`)
  if (!item) return null
  return item
}

export const setData = (key: string, data: any) => {
  localStorage.setItem(`${prefixes.global}${key}`, data)
  return data
}

export const getMemoryGameConfig = () => {
  return (
    getData(prefixes.memoryGameConfig) ?
    JSON.parse(getData(prefixes.memoryGameConfig) || '{}') :
    memoryGameInitialConfig
  )
}

export const setMemoryGameConfig = (config: any) => {
  if (!config) return
  return setData(prefixes.memoryGameConfig, JSON.stringify(config))
}

export const getScratchGameConfig = () => {
  return (
    getData(prefixes.scratchGameConfig) ?
    JSON.parse(getData(prefixes.scratchGameConfig) || '{}') :
    scratchGameInitialConfig
  )
}

export const setScratchGameConfig = (config: any) => {
  if (!config) return
  return setData(prefixes.scratchGameConfig, JSON.stringify(config))
}

export const removeConfig = () => {
  localStorage.removeItem(`${prefixes.global}${prefixes.scratchGameConfig}`)
  return localStorage.removeItem(`${prefixes.global}${prefixes.memoryGameConfig}`)
}

export const clear = () => {
  localStorage.removeItem(`${prefixes.global}${prefixes.scratchGameConfig}`)
  localStorage.removeItem(`${prefixes.global}${prefixes.memoryGameConfig}`)
}