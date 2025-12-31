import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { hashSync } from 'bcrypt';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
  schema: 'absence',
});
const prisma = new PrismaClient({ adapter });
const saltOrRounds = 10;
const hashedPassword = hashSync('password', saltOrRounds);

async function main() {
  const user = await prisma.user.create({
    data: {
      email: 'admin@yopmail.com',
      nama: 'Admin',
      posisi: 'Admin Testing',
      noHp: '085299994751',
      password: hashedPassword,
    },
  });

  console.log('User created:', user);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
