import { prisma } from '@/prisma'

export async function getScreenshot(id: number) {
  const screenshot = await prisma.screenshot.findUnique({
    where: {
      id,
    },
    select: {
      buffer: true,
      type: true,
      fileName: true,
      isPublic: true,
    },
  })

  if (!screenshot)
    return null

  return screenshot
}

export async function deleteScreenshot(id: number) {
  const screenshot = await prisma.screenshot.delete({
    where: {
      id,
    },
  })

  if (!screenshot)
    return null

  return screenshot
}
