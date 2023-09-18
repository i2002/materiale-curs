import { PrismaClient } from '@prisma/client';
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

async function main() {
    let post1 = await prisma.post.upsert({
        where: { id: 1 },
        update: {},
        create: {
            title: "Demo 1",
            content: "This is a demo post",
        }
    });

    let post2 = await prisma.post.upsert({
        where: { id: 2 },
        update: {},
        create: {
            title: "Demo 2",
            content: "This is the second demo post",
        }
    });

    let admin = await prisma.user.upsert({
        where: { email: "admin@example.com"},
        update: {},
        create: {
            name: "Admin",
            email: "admin@example.com",
            password: await bcrypt.hash("password", 10),
            role: "admin"
        }
    })

    console.log({post1, post2, admin});
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })