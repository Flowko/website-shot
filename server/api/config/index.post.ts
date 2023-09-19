export default defineEventHandler(async (event) => {
  try {
    const configName = (await readBody(event)).name

    if (!configName) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
      })
    }

    const response = await createConfig(configName)

    return {
      id: response.id,
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
