import { CronJob } from 'cron'
import { cleanDoubleSlashes, isEmptyURL, normalizeURL } from 'ufo'
import type { Cron } from '@/prisma'
import { prisma } from '@/prisma'

export const jobs: CronJob[] = []

export default defineNitroPlugin(() => {
  startScheduler()
})

async function startScheduler() {
  const crons = await getAllCrons()

  if (!crons || !crons.length)
    return null

  crons.filter(c => c.running).forEach((cron) => {
    addCronJob(cron)
  })
}

export async function addCronJob(cron: Cron) {
  const job = new CronJob(cron.schedule, async () => {
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

    console.warn(`Cron ${cron.id} executed - ${cron.schedule} at ${new Date().toISOString()}`)
  }, null, true)

  jobs.push(job)
}
