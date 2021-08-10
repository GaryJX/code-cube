import { connectToDatabase } from '@/util/db'
import { ObjectId } from 'mongodb'
// import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/client'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })
  const { db } = await connectToDatabase()

  const accessToken: string = (session as any)?.accessToken || ''

  console.log({ accessToken })

  if (!accessToken) {
    return res.status(401).json({ name: 'NOT LOGGED IN!' })
  }

  const dbSession = await db.collection('sessions').findOne({
    accessToken: accessToken,
  })
  console.log({ session, dbSession })

  if (!dbSession) {
    return res.status(401).json({ name: 'Session not found!' })
  }

  const userId = dbSession.userId

  const codeBlocks = await db
    .collection('codeBlocks')
    .find({
      creatorId: userId,
    })
    .toArray()

  console.log({ codeBlocks })

  res.status(200).json(codeBlocks)
}
