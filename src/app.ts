import express from 'express';
import cors from 'cors';
import { rotas } from './routes/index.routes';

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())
app.use(rotas)

export { app }