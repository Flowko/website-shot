import { prisma } from '.'

async function main() {
  const configData = await prisma.config.create({
    data: {
      name: 'default',
      blockAds: false,
    },
  })

  console.warn(`⚙️ upserted config ${configData.id} with name ${configData.name}`)

  const cronData = await prisma.cron.create({
    data: {
      name: 'default',
      schedule: '*/2 * * * *',
      running: true,
      configId: configData.id,
      urls: [
        'https://github.com/Flowko/website-shot',
      ],
    },
  })

  console.warn(`⚙️ upserted cron ${cronData.id} with name ${cronData.name}`)
}

main().then(() => {

}).catch((e) => {
  console.error(e)
  process.exit(1)
}).finally(async () => {
  await prisma.$disconnect()
})
