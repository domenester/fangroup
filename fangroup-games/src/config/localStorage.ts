import { initialConfig } from "./initial"

const prefixes = {
  global: 'fangroup_',
  memoryGameConfig: 'jogodamemoria_configuracao',
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
    initialConfig
  )
}

export const setMemoryGameConfig = (config: any) => {
  if (!config) return
  return setData(prefixes.memoryGameConfig, JSON.stringify(config))
}

export const removeConfig = () => {
  return localStorage.removeItem(`${prefixes.global}${prefixes.memoryGameConfig}`)
}

export const clear = () => {
  localStorage.removeItem(`${prefixes.global}${prefixes.memoryGameConfig}`)
}