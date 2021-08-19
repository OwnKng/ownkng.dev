import nc from 'next-connect'
import type { NextApiRequest, NextApiResponse } from 'next'
import faunadb from 'faunadb'

const client = new faunadb.Client({ secret: process.env.FAUNA_SECRET })

const {
  Match, Get, Index, Create, Collection, Exists, Update,
} = faunadb.query

const handler = nc({})

handler.get(async (req, res) => {
  try {
    const title = req.query.id.toString()

    const doesDocExist = await client.query(
      Exists(Match(Index('posts_by_title'), title)),
    )

    if (!doesDocExist) {
      return res.status(200).json({ views: 1 })
    }

    const document = await client.query(Get(Match(Index('posts_by_title'), title)))

    return res.status(200).json({ views: document.data.views })
  } catch (err) {
    console.log(err)
  }
})

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const title = req.query.id.toString()

    const doesDocExist = await client.query(
      Exists(Match(Index('posts_by_title'), title)),
    )

    if (!doesDocExist) {
      await client.query(
        Create(Collection('posts'), {
          data: { title, views: 0 },
        }),
      )
    }

    const document = await client.query(
      Get(Match(Index('posts_by_title'), title)),
    )

    await client.query(
      Update(document.ref, {
        data: {
          views: document.data.views + 1,
        },
      }),
    )

    return res.status(200).json({ views: document.data.views })
  } catch (err) {
    console.log(err)
  }
})

export default handler
