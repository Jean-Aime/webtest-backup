const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10);

  const user = await prisma.user.upsert({
    where: { email: 'admin@jas.com' },
    update: {},
    create: {
      email: 'admin@jas.com',
      password: hashedPassword,
      name: 'Admin User',
      role: 'admin'
    }
  });

  console.log('Admin user created:', user.email);
  console.log('Password: admin123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
