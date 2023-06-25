export default defineEventHandler(async (event) => {
  const buffer = await load('https://github.com/Flowko/website-shot')

  if (buffer)
    return buffer

  return {
    message: 'Hello World!',
  }
})
