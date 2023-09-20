import type { NextApiRequest, NextApiResponse } from 'next'
import fsPromises from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'public/imagens/raspadinha/cards');

type Data = {
  error?: any
  cards?: any[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const cards = await fsPromises.readdir(dataFilePath)
    res.status(200).send({cards})
  } catch (error) {
    console.log('error: ', error);
    res.status(500).send({error})
  }
}
