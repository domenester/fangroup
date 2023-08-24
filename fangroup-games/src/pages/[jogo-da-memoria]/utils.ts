import { v4 as uuidv4 } from 'uuid'

export const fixedRandomSorts = (cardsLength: number) => {
  const sorts = []
  for (let i = 0; i < cardsLength * 2; i++) {
    sorts.push(Math.random())
  }
  return sorts
}

export const fixedIds = (cardsLength: number) => {
  const ids = []
  for (let i = 0; i < cardsLength*2; i++) {
    ids.push(uuidv4())
  }
  return ids
}

export default fixedRandomSorts
