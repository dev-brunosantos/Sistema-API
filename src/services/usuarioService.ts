import { Prisma } from "../config/prisma";

const prisma = new Prisma()

export class UsuarioService {
    async Cadastrar(
        nome: string, email: string,
        senha: string, sobrenome?: string,
    ) {
        const usuarioExistente = await prisma.Usuario().findFirst({
            where: { email }
        })

        if(!usuarioExistente) {
            const novoUsuario = await prisma.Usuario().create({
                data: { nome, sobrenome, email, senha}
            })

            return `O usuário ${novoUsuario.nome.toUpperCase()} ${novoUsuario.sobrenome?.toUpperCase()} foi cadastrado com sucesso.`
        }

        return `Usuário ja cadastrado no sistema.`
    }

    async ListarUsuarios() {
        const usuarios = await prisma.Usuario().findMany({
            select: {
                id: true,
                nome: true,
                sobrenome: true,
                email: true,
                dtCriacao: true
            }
        })

        if(usuarios.length > 0) {
            return usuarios
        }

        return {
            statusCode: 404,
            msg: 'Não existe nenhum usuário cadastrado no sistema.'
        }
    }
}
