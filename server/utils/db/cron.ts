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

  return cronObj
}

export async function updateCron(id: number, cron: Cron) {
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
