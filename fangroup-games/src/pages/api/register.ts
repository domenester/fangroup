import type { NextApiRequest, NextApiResponse } from 'next'
import fsPromises from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'registros.json');

type Data = {}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let registers = []
  let fileDataParsed = []

  try {
    const fileData = await fsPromises.readFile(dataFilePath);
    fileDataParsed = JSON.parse(fileData as any);
  } catch (error) { console.log('error: ', error); }

  registers = [...fileDataParsed, req.body]
  await fsPromises.writeFile(dataFilePath, JSON.stringify(registers));
  res.status(200).send({})
}
