
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

const Posts: NextApiHandler = (req: NextApiRequest, res: NextApiResponse) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.write(JSON.stringify({
    id: 1,
    name: '我是帖子1'
  }))
  res.end()
}

export default Posts