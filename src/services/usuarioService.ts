import { Prisma } from "../config/prisma";
import { sign } from 'jsonwebtoken';
import { compare } from 'bcrypt';
import dotenv from 'dotenv'

dotenv.config()


const prisma = new Prisma()

export class UsuarioService {
    async Cadastrar(
        nome: string, email: string,
        senha: string, sobrenome?: string,
    ) {
        const usuarioExistente = await prisma.Usuario().findFirst({
            where: { email }
        })

        if (!usuarioExistente) {
            const novoUsuario = await prisma.Usuario().create({
                data: { nome, email, senha, sobrenome }
            })

            return `O usuário ${novoUsuario.nome.toUpperCase()} foi cadastrado com sucesso.`
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

        if (usuarios.length > 0) {
            return usuarios
        }

        return {
            statusCode: 404,
            msg: 'Não existe nenhum usuário cadastrado no sistema.'
        }
    }

    async FiltrarUsuario(id: string) {
        const idUsuario = await prisma.Usuario().findFirst({
            where: { id },
            select: {
                id: true,
                nome: true,
                sobrenome: true,
                email: true,
                dtCriacao: true
            }
        })

        if (idUsuario) {
            return idUsuario
        }

        return {
            statusCode: 404,
            msg: 'Não foi encontrado nenhum usuário vinculado ao ID informado.'
        }
    }

    async ApagarUsuario(id: string) {
        const usuarioId = await prisma.Usuario().findMany({
            where: { id }
        })

        if (usuarioId) {
            await prisma.Usuario().delete({
                where: { id }
            })

            return {
                statusCode: 200,
                msg: `Os dados do usuário  foram apagados.`
            }
        }

        return {
            statusCode: 404,
            msg: 'Não foi encontrado nenhum usuário vinculado ao ID informado.'
        }
    }

    async Login(email: string, senha: string) {
        const usuarioExistente = await prisma.Usuario().findFirst({
            where: { email }
        })

        if (!usuarioExistente) {
            return {
                statusCode: 404,
                msg: "Usuário não cadastrado no sistema."
            }
        }

        const senhaDesctiptografada = await compare(senha, usuarioExistente.senha)
        if (!senhaDesctiptografada) {

            return {
                statusCode: 400,
                msg: "Usuário não possui permissão para acessar essa rota."
            }
        }

        const secret = process.env.SECRET
        if (!secret) {
            throw new Error('A variável de ambiente SECRET não está definida');
        }

        const token = await sign(
            { id: usuarioExistente.id.slice(0, 8) },
            secret,
            {
                subject: usuarioExistente.id.slice(0, 8),
                expiresIn: '1d'
            }
        )

        return {
            id: usuarioExistente.id.slice(0, 8),
            token: token
        }
    }
}
