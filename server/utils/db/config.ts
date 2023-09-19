import type { Config } from '@/prisma'
import { prisma } from '@/prisma'

export async function createConfig(name: string) {
  const config = await prisma.config.create({
    data: {
      name,
    },
    select: {
      id: true,
    },
  })

  if (!config)
    throw new Error('Config creation failed')

  return config
}

export async function getAllConfigs() {
  const configObj = await prisma.config.findMany({
    include: {
      Screenshot: {
        select: {
          id: true,
          url: true,
        },
      },
      Cron: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  })

  if (!configObj)
    throw new Error('Cron retrieval failed')

  return configObj
}

export async function updateConfig(id: number, config: Config) {
  const configObj = await prisma.config.update({
    where: {
      id,
    },
    data: {
      ...omit(config, ['id', 'createdAt', 'updatedAt']),
    },
  })

  if (!configObj)
    throw new Error('Cron update failed')

  return configObj
}

export async function getConfig(id: number) {
  const configObj = await prisma.config.findUnique({
    where: {
      id,
    },
    include: {
      Screenshot: {
        select: {
          id: true,
          url: true,
        },
      },
      Cron: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  })

  if (!configObj)
    throw new Error('Cron retrieval failed')

  return configObj
}

export async function deleteConfig(id: number) {
  const configObj = await prisma.config.delete({
    where: {
      id,
    },
  })

  if (!configObj)
    throw new Error('Cron deletion failed')

  return configObj
}
