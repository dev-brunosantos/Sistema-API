import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient()

export class Prisma {
    Usuario() {
        const usuario = prismaClient.usuario
        return usuario
    }
    Tarefa() {
        const tarefa = prismaClient.tarefa
        return tarefa
    }
}
