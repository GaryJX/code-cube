import { connectToDatabase } from '@/util/db'
import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/client'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })
  const { db } = await connectToDatabase()
  const { id } = req.query

  const accessToken: string = (session as any)?.accessToken || ''

  if (!accessToken) {
    return res.status(401).json({ name: 'NOT LOGGED IN!' })
  }

  const dbSession = await db.collection('sessions').findOne({
    accessToken: accessToken,
  })

  if (!dbSession) {
    return res.status(401).json({ name: 'Session not found!' })
  }

  const userId = dbSession.userId

  const codeBlock = await db.collection('codeBlocks').findOne({
    creatorId: userId,
    _id: new ObjectId(id),
  })

  console.log({ codeBlock })

  res.status(200).json(codeBlock)
}
