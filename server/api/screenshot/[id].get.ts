export default defineEventHandler(async (event) => {
  try {
    const id = event.context.params && event.context.params.id ? Number.parseInt(event.context.params.id) : null

    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'id is required',
      })
    }

    const screenshot = await getScreenshot(id)

    if (!screenshot) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Something went wrong',
      })
    }

    const { buffer, type } = screenshot

    event.node.res.setHeader('Content-Type', type)
    // TODO: add an option to download or not
    // event.node.res.setHeader('Content-Disposition', `attachment; filename=${screenshot.fileName}`)

    if (buffer)
      return buffer
  }
  catch (error) {
    console.error(error)

    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    })
  }
})
