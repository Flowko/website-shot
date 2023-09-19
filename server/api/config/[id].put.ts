import type { Config } from '@prisma/client'

export default defineEventHandler(async (event) => {
  try {
    const id = event.context.params && event.context.params.id ? Number.parseInt(event.context.params.id) : null

    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'id is required',
      })
    }

    const configObj = await readBody(event) as Config

    const config = await updateConfig(id, configObj)

    if (!config) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Something went wrong',
      })
    }

    return {
      statusCode: 200,
      data: config,
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
