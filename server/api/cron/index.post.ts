import type { Cron } from '@prisma/client'

export default defineEventHandler(async (event) => {
  try {
    const cronObj = await readBody(event) as Cron

    const response = await createCron(cronObj)

    return {
      statusCode: 200,
      data: response,
    }
  }
  catch (error) {
    console.error(error)

    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    })
  }
})
