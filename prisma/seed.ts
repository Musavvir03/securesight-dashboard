import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create cameras
  const shopFloorA = await prisma.camera.create({
    data: {
      name: 'Shop Floor A',
      location: 'Manufacturing Area',
    },
  })

  const vault = await prisma.camera.create({
    data: {
      name: 'Vault',
      location: 'Security Area',
    },
  })

  const entrance = await prisma.camera.create({
    data: {
      name: 'Entrance',
      location: 'Main Building',
    },
  })

  const parking = await prisma.camera.create({
    data: {
      name: 'Parking Lot',
      location: 'Exterior',
    },
  })

  // Get current date and create incidents over the last 24 hours
  const now = new Date()
  const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000)

  const incidents = [
    // Unauthorised Access incidents
    {
      cameraId: entrance.id,
      type: 'Unauthorised Access',
      tsStart: new Date(oneDayAgo.getTime() + 2 * 60 * 60 * 1000), // 2 hours ago
      tsEnd: new Date(oneDayAgo.getTime() + 2 * 60 * 60 * 1000 + 5 * 60 * 1000), // 5 minutes later
      thumbnailUrl: '/images/incident-1.jpg',
    },
    {
      cameraId: vault.id,
      type: 'Unauthorised Access',
      tsStart: new Date(oneDayAgo.getTime() + 4 * 60 * 60 * 1000), // 4 hours ago
      tsEnd: new Date(oneDayAgo.getTime() + 4 * 60 * 60 * 1000 + 3 * 60 * 1000), // 3 minutes later
      thumbnailUrl: '/images/incident-2.jpg',
    },
    {
      cameraId: shopFloorA.id,
      type: 'Unauthorised Access',
      tsStart: new Date(oneDayAgo.getTime() + 6 * 60 * 60 * 1000), // 6 hours ago
      tsEnd: new Date(oneDayAgo.getTime() + 6 * 60 * 60 * 1000 + 7 * 60 * 1000), // 7 minutes later
      thumbnailUrl: '/images/incident-3.jpg',
    },

    // Gun Threat incidents
    {
      cameraId: entrance.id,
      type: 'Gun Threat',
      tsStart: new Date(oneDayAgo.getTime() + 8 * 60 * 60 * 1000), // 8 hours ago
      tsEnd: new Date(oneDayAgo.getTime() + 8 * 60 * 60 * 1000 + 12 * 60 * 1000), // 12 minutes later
      thumbnailUrl: '/images/incident-4.jpg',
    },
    {
      cameraId: parking.id,
      type: 'Gun Threat',
      tsStart: new Date(oneDayAgo.getTime() + 10 * 60 * 60 * 1000), // 10 hours ago
      tsEnd: new Date(oneDayAgo.getTime() + 10 * 60 * 60 * 1000 + 8 * 60 * 1000), // 8 minutes later
      thumbnailUrl: '/images/incident-5.jpg',
    },
    {
      cameraId: vault.id,
      type: 'Gun Threat',
      tsStart: new Date(oneDayAgo.getTime() + 12 * 60 * 60 * 1000), // 12 hours ago
      tsEnd: new Date(oneDayAgo.getTime() + 12 * 60 * 60 * 1000 + 15 * 60 * 1000), // 15 minutes later
      thumbnailUrl: '/images/incident-6.jpg',
    },

    // Face Recognised incidents
    {
      cameraId: entrance.id,
      type: 'Face Recognised',
      tsStart: new Date(oneDayAgo.getTime() + 14 * 60 * 60 * 1000), // 14 hours ago
      tsEnd: new Date(oneDayAgo.getTime() + 14 * 60 * 60 * 1000 + 4 * 60 * 1000), // 4 minutes later
      thumbnailUrl: '/images/incident-7.jpg',
    },
    {
      cameraId: shopFloorA.id,
      type: 'Face Recognised',
      tsStart: new Date(oneDayAgo.getTime() + 16 * 60 * 60 * 1000), // 16 hours ago
      tsEnd: new Date(oneDayAgo.getTime() + 16 * 60 * 60 * 1000 + 6 * 60 * 1000), // 6 minutes later
      thumbnailUrl: '/images/incident-8.jpg',
    },
    {
      cameraId: parking.id,
      type: 'Face Recognised',
      tsStart: new Date(oneDayAgo.getTime() + 18 * 60 * 60 * 1000), // 18 hours ago
      tsEnd: new Date(oneDayAgo.getTime() + 18 * 60 * 60 * 1000 + 9 * 60 * 1000), // 9 minutes later
      thumbnailUrl: '/images/incident-9.jpg',
    },

    // Suspicious Activity incidents
    {
      cameraId: vault.id,
      type: 'Suspicious Activity',
      tsStart: new Date(oneDayAgo.getTime() + 20 * 60 * 60 * 1000), // 20 hours ago
      tsEnd: new Date(oneDayAgo.getTime() + 20 * 60 * 60 * 1000 + 10 * 60 * 1000), // 10 minutes later
      thumbnailUrl: '/images/incident-10.jpg',
    },
    {
      cameraId: entrance.id,
      type: 'Suspicious Activity',
      tsStart: new Date(oneDayAgo.getTime() + 22 * 60 * 60 * 1000), // 22 hours ago
      tsEnd: new Date(oneDayAgo.getTime() + 22 * 60 * 60 * 1000 + 11 * 60 * 1000), // 11 minutes later
      thumbnailUrl: '/images/incident-11.jpg',
    },
    {
      cameraId: shopFloorA.id,
      type: 'Suspicious Activity',
      tsStart: new Date(oneDayAgo.getTime() + 23 * 60 * 60 * 1000), // 23 hours ago
      tsEnd: new Date(oneDayAgo.getTime() + 23 * 60 * 60 * 1000 + 13 * 60 * 1000), // 13 minutes later
      thumbnailUrl: '/images/incident-12.jpg',
    },
  ]

  // Create incidents
  for (const incident of incidents) {
    await prisma.incident.create({
      data: incident,
    })
  }

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 