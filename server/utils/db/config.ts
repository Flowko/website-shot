import { prisma } from '@/prisma'


export async function createConfig(name: string) {
  const config = await prisma.config.create({
    data: {
      name,
    },
  })

  if (!config)
    throw new Error('Config creation failed')

  return config
}
