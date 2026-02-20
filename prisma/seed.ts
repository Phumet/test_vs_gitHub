import { PrismaClient } from '@prisma/client';
import { config } from '../lib/config';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create seminar
  const seminar = await prisma.seminar.upsert({
    where: { id: 'demo-seminar-1' },
    update: {},
    create: {
      id: 'demo-seminar-1',
      title: config.seminar.title,
      description: config.seminar.description,
      date: new Date(config.seminar.date),
      startTime: config.seminar.startTime,
      endTime: config.seminar.endTime,
      venue: config.seminar.venue,
      capacity: config.seminar.capacity,
      registeredCount: 0,
      status: 'open',
    },
  });

  console.log('✅ Created seminar:', seminar.title);

  // Optional: Create some demo registrations for testing
  const demoRegistrations = [
    {
      name: 'สมชาย ใจดี',
      email: 'somchai@example.com',
      phone: '0812345678',
      organization: 'Tech Company A',
    },
    {
      name: 'สมหญิง รักเรียน',
      email: 'somying@example.com',
      phone: '0898765432',
      organization: 'Startup B',
    },
  ];

  for (const reg of demoRegistrations) {
    const registration = await prisma.registration.upsert({
      where: {
        seminarId_email: {
          seminarId: seminar.id,
          email: reg.email,
        },
      },
      update: {},
      create: {
        ...reg,
        seminarId: seminar.id,
        status: 'confirmed',
      },
    });
    console.log('✅ Created registration:', registration.name);
  }

  // Update registered count
  await prisma.seminar.update({
    where: { id: seminar.id },
    data: {
      registeredCount: demoRegistrations.length,
    },
  });

  console.log('🎉 Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
