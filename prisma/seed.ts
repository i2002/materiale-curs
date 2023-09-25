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
    });

    let student1 = await prisma.user.upsert({
        where: { email: "tudor.butufei@gmail.com" },
        update: {},
        create: {
            email: "tudor.butufei@gmail.com",
            role: "student"
        }
    });

    let list1 = await prisma.studentList.upsert({
        where: { id: 1 },
        update: {},
        create: {
            name: "Seria 2021",
            id: 1,
            students: { connect: { id: student1.id } }
        }
    });

    let rootFolder = await prisma.resource.create({
        data: {
            name: "",
            type: "folder"
        }
    });

    let folder1 = await prisma.resource.create({
        data: {
            name: "Semestrul 1",
            type: "folder",
            parent: {
                connect: { id: rootFolder.id }
            }
        }
    });

    let folder2 = await prisma.resource.create({
        data: {
            name: "Semestrul 2",
            type: "folder",
            parent: {
                connect: { id: rootFolder.id }
            }
        }
    });

    let file1 = await prisma.resource.create({
        data: {
            name: "Fisier 1",
            type: "document",
            fileData: {
                create: {
                    mimeType: "text/plain",
                    path: "abc",
                    size: 13
                }
            },
            parent: { connect: { id: rootFolder.id } }
        }
    });

    let file2 = await prisma.resource.create({
        data: {
            name: "Fisier 2",
            type: "document",
            fileData: {
                create: {
                    mimeType: "text/plain",
                    path: "abd",
                    size: 13
                }
            },
            parent: { connect: { id: folder1.id } }
        }
    });

    let course1 = await prisma.course.upsert({
        where: { slug: "autocad" },
        update: {},
        create: {
            name: "Autocad",
            slug: "autocad",
            year: 1,
            semester: 2,
            enrlolments: { connect: { id: list1.id } },
            rootFolder: { connect: { id: rootFolder.id }}
        }
    });

    console.log({post1, post2, admin, student1, list1, course1});
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