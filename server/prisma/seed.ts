import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as pg from 'pg';
import * as dotenv from 'dotenv';
import { join } from 'path';

// Load environment variables from the root .env file
dotenv.config({ path: join(__dirname, '../../.env') });

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error('DATABASE_URL is not defined');
  process.exit(1);
}

const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Start seeding...');

  const users = [
    {
      email: 'john.doe@example.com',
      name: 'John Doe',
    },
    {
      email: 'jane.smith@example.com',
      name: 'Jane Smith',
    },
    {
      email: 'alice.wonder@example.com',
      name: 'Alice Wonder',
    },
    {
      email: 'm.wonder@example.com',
      name: 'm Wonder',
    },
    {
      email: 'f.wonder@example.com',
      name: 'f Wonder',
    },
    {
      email: 'd.wonder@example.com',
      name: 'd Wonder',
    },
  ];

  for (const u of users) {
    const user = await prisma.user.upsert({
      where: { email: u.email },
      update: {},
      create: u,
    });
    console.log(`Created user with id: ${user.id}`);
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
