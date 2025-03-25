import { Router } from "express";
import { usuarioController } from "../controllers/usuarioController";
import { Auth } from "../middleware/auth";

const rotas = Router()

rotas.post('/usuarios', usuarioController.Cadastrar)
rotas.get('/usuarios', usuarioController.Listar)
rotas.get('/usuarios/:id', usuarioController.Filtrar)
rotas.delete('/usuarios/apagar/:id', Auth, usuarioController.Apagar)

rotas.post('/login', usuarioController.Login)

export { rotas } 