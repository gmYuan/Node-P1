
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

const Posts: NextApiHandler = (req: NextApiRequest, res: NextApiResponse) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.write(JSON.stringify([{
    id: 1,
    title: '我是帖子1',
    date: '2023-01-01'
  }, {
    id: 2,
    title: '我是帖子2',
    date: '2023-01-01'
  }]))
  res.end()
}

export default Posts