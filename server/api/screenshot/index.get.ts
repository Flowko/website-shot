import { cleanDoubleSlashes, isEmptyURL, normalizeURL } from 'ufo'

export default defineEventHandler(async (event) => {
  let { config, url } = getQuery(event) as {
    url: string
    config?: number
  }

  if (isEmptyURL(url)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Url is required',
    })
  }

  url = normalizeURL(url)
  url = cleanDoubleSlashes(url)

  if (config && typeof config === 'string')
    config = Number.parseInt(config)

  const res = await load(url, config)

  if (!res) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Something went wrong',
    })
  }

  const { buffer, type } = res

  event.node.res.setHeader('Content-Type', type)

  if (buffer)
    return buffer

  throw createError({
    statusCode: 500,
    statusMessage: 'Internal Server Error',
  })
})
