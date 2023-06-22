import fsPromises from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'registros.json');

export default async function handler(req, res) {
  let registers = []
  const fileData = await fsPromises.readFile(dataFilePath);
  const fileDataParsed = JSON.parse(fileData) || [];
  registers = [...fileDataParsed, req.body]
  await fsPromises.writeFile(dataFilePath, JSON.stringify(registers));
  res.status(200).json({})
}
