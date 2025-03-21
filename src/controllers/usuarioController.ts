import { Request, Response } from "express";
import { UsuarioService } from "../services/usuarioService";
import { hash } from 'bcrypt';
import dotenv from 'dotenv';
import { Prisma } from "../config/prisma";

dotenv.config()

const service = new UsuarioService()

class Usuario {
    async Cadastrar(req: Request, res: Response) {
        const { nome, sobrenome, email, senha } = req.body

        const senhaCriptografada = await hash(senha, 5)

        const novoUsuario = await service.Cadastrar(nome, sobrenome, email, senhaCriptografada)

        res.json(novoUsuario)
    }

    async Listar(req: Request, res: Response) {
        const usuarios = await service.ListarUsuarios()
        res.json(usuarios)
    }
}


const usuarioController = new Usuario()

export { usuarioController }

