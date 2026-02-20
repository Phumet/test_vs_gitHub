// Fix existing emails to lowercase
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🔧 Fixing email case sensitivity...");

  // Get all registrations
  const registrations = await prisma.registration.findMany();

  console.log(`📊 Found ${registrations.length} registrations to check`);

  let updated = 0;

  // Update each registration to lowercase email
  for (const registration of registrations) {
    const lowercaseEmail = registration.email.toLowerCase();

    if (registration.email !== lowercaseEmail) {
      await prisma.registration.update({
        where: { id: registration.id },
        data: { email: lowercaseEmail },
      });

      console.log(`✅ Updated: ${registration.email} → ${lowercaseEmail}`);
      updated++;
    }
  }

  console.log(
    `\n🎉 Done! Updated ${updated} email(s) to lowercase`
  );
  console.log(`📌 ${registrations.length - updated} email(s) were already lowercase`);
}

main()
  .catch((e) => {
    console.error("❌ Error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
