export default defineEventHandler(async (event) => {
  try {
    const screenshots = await getAllScreenshots()

    if (!screenshots) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Something went wrong',
      })
    }

    return {
      statusCode: 200,
      data: screenshots,
    }
  }
  catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    })
  }
})