import type { Cron } from '@prisma/client'

export default defineEventHandler(async (event) => {
  const cronObj = await readBody(event) as Cron

  const response = await createCron(cronObj)

  return {
    statusCode: 200,
    data: response,
  }
})
