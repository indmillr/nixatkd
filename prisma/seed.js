const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const roles = [
    "admin",
    "white",
    "loyellow",
    "hiyellow",
    "logreen",
    "higreen",
    "loblue",
    "hiblue",
    "purple",
    "lored",
    "hired",
    "lobrown",
    "hibrown",
    "black",
    "black1",
    "black2",
    "black3",
    "black4",
    "black5",
    "black6",
  ];

  for (const role of roles) {
    await prisma.role.upsert({
      where: { name: role },
      update: {},
      create: { name: role },
    });
  }
}

main()
  .then(() => console.log("Seed data created successfully"))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
