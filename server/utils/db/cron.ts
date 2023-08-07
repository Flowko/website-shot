import { CronTime } from 'cron'
import { addCronJob, jobs } from '../../plugins/scheduler'
import type { Cron } from '@/prisma'
import { prisma } from '@/prisma'

export async function createCron(cron: Cron) {
  const cronObj = await prisma.cron.create({
    data: {
      name: cron.name,
      schedule: cron.schedule,
      configId: cron.configId,
      urls: cron.urls,
    },
  })

  if (!cronObj)
    throw new Error('Cron creation failed')

  await addCronJob(cronObj)

  return cronObj
}

export async function deleteCron(id: number) {
  const cronObj = await prisma.cron.delete({
    where: {
      id,
    },
  })

  if (!cronObj)
    throw new Error('Cron deletion failed')

  const cronJob = jobs.find(c => c.cronTime.source === cronObj.schedule)

  if (cronJob) {
    cronJob.stop()
    jobs.splice(jobs.indexOf(cronJob), 1)
  }

  return cronObj
}

export async function updateCron(id: number, cron: Cron) {
  const oldCron = await prisma.cron.findUnique({
    where: {
      id,
    },
  })

  if (!oldCron)
    throw new Error('Cron not found')

  const cronObj = await prisma.cron.update({
    where: {
      id,
    },
    data: {
      name: cron.name,
      schedule: cron.schedule,
      configId: cron.configId,
      urls: cron.urls,
      running: cron.running,
    },
  })

  const cronJob = jobs.find(c => c.cronTime.source === oldCron.schedule)

  if (cronJob) {
    const newTime = new CronTime(cron.schedule)

    if (cronJob.cronTime.source !== cron.schedule) {
      console.log('Cron schedule changed')

      cronJob.setTime(newTime)
      cronJob.start()
    }

    if (cron.running !== cronJob.running) {
      if (cron.running)
        cronJob.start()
      else
        cronJob.stop()
    }

    if (cron.urls !== oldCron.urls) {
      cronJob.stop()
      cronJob.setTime(newTime)
      cronJob.start()
    }
  }

  if (!cronObj)
    throw new Error('Cron update failed')

  return cronObj
}

export async function getAllCrons() {
  const cronObj = await prisma.cron.findMany({
    include: {
      screenshots: {
        select: {
          id: true,
          url: true,
          fileName: true,
          isPublic: true,
          type: true,
          configId: true,
        },
      },
    },
  })

  if (!cronObj)
    throw new Error('Cron retrieval failed')

  return cronObj
}
