export default defineEventHandler(async (event) => {
  try {
    const id = event.context.params && event.context.params.id ? Number.parseInt(event.context.params.id) : null

    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'id is required',
      })
    }

    const screenshot = await deleteScreenshot(id)

    if (!screenshot) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Something went wrong',
      })
    }

    return {
      statusCode: 200,
      data: `Screenshot with id ${id} deleted successfully`,
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
