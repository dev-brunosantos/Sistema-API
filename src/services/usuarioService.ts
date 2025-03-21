import { Prisma } from "../config/prisma";

export class UsuarioService {
    constructor(private prisma: Prisma) {}

    async Cadastrar(
        nome: string, email: string,
        senha: string, sobrenome?: string,
    ) {
        const usuarioExistente = await this.prisma.Usuario().findFirst({
            where: { email }
        })

        if(!usuarioExistente) {
            const novoUsuario = await this.prisma.Usuario().create({
                data: { nome, sobrenome, email, senha}
            })

            return `O usuário ${novoUsuario.nome.toUpperCase()} ${novoUsuario.sobrenome?.toUpperCase()} foi cadastrado com sucesso.`
        }

        return `Usuário ja cadastrado no sistema.`
    }

    async ListarUsuarios() {
        const usuarios = await this.prisma.Usuario().findMany({
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

        return 'Não existe nenhum usuário cadastrado no sistema.'
    }
}
