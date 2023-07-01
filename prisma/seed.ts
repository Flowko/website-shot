import { prisma } from '.'

async function createDefaultConfig(config: {
  name: string
}) {
  const configData = await prisma.config.create({
    data: {
      name: config.name,
      delay: 5,
      blockAds: false,
    },
  })

  console.log(`⚙️ upserted config ${configData.id} with name ${configData.name}`)
}

async function main() {
  await createDefaultConfig({
    name: 'default',
  })
}

main().then(() => {

}).catch((e) => {
  console.error(e)
  process.exit(1)
}).finally(async () => {
  await prisma.$disconnect()
})
