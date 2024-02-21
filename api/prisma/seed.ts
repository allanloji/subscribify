import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create recipients
  const recipients = ['test@email.com', 'john.doe@example.com'];

  await Promise.all(
    recipients.map(async (email: string) => {
      return await prisma.recipient.upsert({
        where: { email },
        update: {},
        create: { email },
      });
    }),
  );
  // Create newsletters
  const newsletterOasis = await prisma.newsletter.upsert({
    where: { id: 'c230544b-076e-4d98-8e4f-e6c3af5fc25b' },
    update: {},
    create: {
      id: 'c230544b-076e-4d98-8e4f-e6c3af5fc25b',
      name: 'Oasis Gazette',
      file: 'mail.png',
      recipients: {
        connect: recipients.map((email: string) => ({ email })),
      },
    },
    include: {
      recipients: true,
    },
  });

  const newsletterSparkle = await prisma.newsletter.upsert({
    where: { id: 'c230544b-076e-4d98-8e4f-e6c3af5fc25c' },
    update: {},
    create: {
      id: 'c230544b-076e-4d98-8e4f-e6c3af5fc25c',
      name: 'Sparkle Bulletin',
      file: 'mail.png',
      recipients: {
        connect: recipients.map((email: string) => ({ email })),
      },
    },
    include: {
      recipients: true,
    },
  });

  // Create statistics
  await prisma.emailLog.upsert({
    where: { id: 'c230544b-076e-4d98-8e4f-e6c3af5fc25d' },
    update: {},
    create: {
      id: 'c230544b-076e-4d98-8e4f-e6c3af5fc25d',
      newsletterId: newsletterOasis.id,
      emailsSent: 10,
    },
  });

  await prisma.emailLog.upsert({
    where: { id: 'c230544b-076e-4d98-8e4f-e6c3af5fc25d' },
    update: {},
    create: {
      id: 'c230544b-076e-4d98-8e4f-e6c3af5fc25d',
      newsletter: { connect: { id: newsletterSparkle.id } },
      emailsSent: 5,
    },
  });

  await prisma.unsubscribeLog.upsert({
    where: { id: 'c230544b-076e-4d98-8e4f-e6c3af5fc25e' },
    update: {},
    create: {
      id: 'c230544b-076e-4d98-8e4f-e6c3af5fc25e',
      recipient: { connect: { email: recipients[0] } },
      newsletter: { connect: { id: newsletterOasis.id } },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
