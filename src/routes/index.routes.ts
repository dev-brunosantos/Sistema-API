import { Router } from "express";
import { usuarioController } from "../controllers/usuarioController";

const rotas = Router()

rotas.post('/usuarios', usuarioController.Cadastrar)
rotas.get('/usuarios', usuarioController.Listar)
rotas.get('/usuarios/:id', usuarioController.Filtrar)
rotas.delete('/usuarios/apagar/:id', usuarioController.Apagar)

export { rotas } 