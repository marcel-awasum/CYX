import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const banks = ['Atlas Bank', 'Kijani Bank', 'Sahara Finance'];
  const investors = ['Alpha Pension', 'Baobab Asset Mgmt', 'Delta Insurance', 'Emerald Sovereign', 'Frontier Credit Fund'];

  for (const name of banks) {
    await prisma.organization.upsert({
      where: { id: name },
      update: {},
      create: { id: name, name, type: 'Bank' }
    });
  }
  for (const name of investors) {
    await prisma.organization.upsert({ where: { id: name }, update: {}, create: { id: name, name, type: 'Investor' } });
  }

  await prisma.deal.createMany({ data: [
    { originatorOrgId: 'Atlas Bank', jurisdiction: 'Kenya', tenor: 24, size: 12000000, status: 'Published' },
    { originatorOrgId: 'Sahara Finance', jurisdiction: 'Nigeria', tenor: 36, size: 25000000, status: 'Intake' }
  ]});

  await prisma.invoice.create({ data: { organizationId: 'Atlas Bank', reference: 'INV-CYX-001', status: 'Payable', currency: 'USD', total: 85000 } });
}
main().finally(() => prisma.$disconnect());
