/* eslint-disable no-console, @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires, @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-function-return-type */
import OpenAI from 'openai'

require('dotenv').config()

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

const aiController = async (req: any, res, next) => {
  try {
    const content = req.query.content

    if (!content) {
      return res.status(400).send('No message provided')
    }

    const completion = await openai.chat.completions.create({
      messages: [{ role: 'system', content }],
      model: 'gpt-4-1106-preview',
    })

    console.log(completion.choices[0])

    const response = completion.choices[0].message.content

    return res.send({
      user: req.user,
      response,
    })
  } catch (error: unknown) {
    console.error(error)

    return next(error)
  }
}

export default aiController
