import { cleanDoubleSlashes, isEmptyURL, normalizeURL } from 'ufo'
import { useScheduler } from '#scheduler'
import { prisma } from '@/prisma'

export default defineNitroPlugin(() => {
  startScheduler()
})

async function startScheduler() {
  const scheduler = useScheduler()

  const crons = await getAllCrons()

  if (!crons || !crons.length)
    return null

  crons.filter(c => c.running).forEach((cron) => {
    scheduler.run(async () => {
      cron.urls.forEach(async (url) => {
        if (isEmptyURL(url))
          throw new Error('Url is required')

        url = normalizeURL(url)
        url = cleanDoubleSlashes(url)

        const res = await load(url, cron.configId, cron.id)

        if (!res)
          throw new Error('Something went wrong')
      })

      await prisma.cron.update(
        {
          where: {
            id: cron.id,
          },
          data: {
            runs: cron.runs + 1,
          },
        },
      )

      console.log(`Cron ${cron.id} executed`)
    }).cron(cron.schedule)
  })
}
