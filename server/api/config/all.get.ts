export default defineEventHandler(async (_) => {
  try {
    const configs = await getAllConfigs()

    if (!configs) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Something went wrong',
      })
    }

    return configs
  }
  catch (error) {
    console.error(error)

    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    })
  }
})
