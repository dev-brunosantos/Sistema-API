import { Router } from "express";
import { usuarioController } from "../controllers/usuarioController";

const rotas = Router()

rotas.post('/usuarios', usuarioController.Cadastrar)
rotas.get('/usuarios', usuarioController.Listar)
rotas.delete('/usuarios/apagar/:id', usuarioController.Apagar)

export { rotas } 