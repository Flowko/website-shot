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

export async function createScreenshot(url: string, fileName: string, configId: number, buffer: Buffer, type: string) {
  const alreadyExists = checkSameBuffer(buffer)

  if (alreadyExists)
    return alreadyExists

  const screenshot = await prisma.screenshot.create({
    data: {
      url,
      fileName,
      configId,
      buffer,
      type,
    },
  })

  if (!screenshot)
    throw new Error('Screenshot creation failed')

  return screenshot
}

export async function checkSameBuffer(buffer: Buffer) {
  const screenshot = await prisma.screenshot.findFirst({
    where: {
      buffer,
    },
  })

  if (!screenshot)
    return null

  return screenshot
}

export async function getAllScreenshots() {
  const screenshots = await prisma.screenshot.findMany({
    select: {
      id: true,
      url: true,
      fileName: true,
      type: true,
      isPublic: true,
      configId: true,
      createdAt: true,
      updatedAt: true,
    },
  })

  if (!screenshots)
    return null

  return screenshots
}
