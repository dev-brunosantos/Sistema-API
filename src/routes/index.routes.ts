import { Router } from "express";
import { usuarioController } from "../controllers/usuarioController";

const rotas = Router()

rotas.post('/usuarios/cadastro', usuarioController.Cadastrar)
rotas.get('/usuarios', usuarioController.Listar)

export { rotas } 