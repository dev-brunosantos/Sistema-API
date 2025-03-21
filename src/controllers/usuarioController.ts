import { Request, Response } from "express";
import { UsuarioService } from "../services/usuarioService";
import { hash } from 'bcrypt';
import dotenv from 'dotenv';
import { Prisma } from "../config/prisma";

dotenv.config()

const service = new UsuarioService()

class Usuario {
    async Cadastrar(req: Request, res: Response) {
        const { nome, email, senha, sobrenome } = req.body

        const senhaCriptografada = await hash(senha, 10)

        const novoUsuario = await service.Cadastrar(nome, email, senhaCriptografada, sobrenome)

        res.json(novoUsuario)
    }

    async Listar(req: Request, res: Response) {
        const usuarios = await service.ListarUsuarios()
        res.json(usuarios)
    }

    async Filtrar(req: Request, res: Response) {
        const { id } = req.params
        const idUsuario = await service.FiltrarUsuario(id)
        res.json(idUsuario)
    }

    async Apagar(req: Request, res: Response) {
        const id = req.params.id
        const usuarioId = await service.ApagarUsuario(id)
        res.json(usuarioId)
    }
}


const usuarioController = new Usuario()

export { usuarioController }

