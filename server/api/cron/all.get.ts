export default defineEventHandler(async (event) => {
  try {
    const crons = await getAllCrons()

    if (!crons) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Something went wrong',
      })
    }

    return {
      statusCode: 200,
      data: crons,
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
