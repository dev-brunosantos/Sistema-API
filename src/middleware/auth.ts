import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface Payload {
    sub: string;
}

export function Auth(req: Request, res: Response, next: NextFunction): void {

    const secret = process.env.SECRET
    if (!secret) {
        res.status(401).end()
        return
    }

    const authToken = req.headers.authorization;
    if (!authToken) {
        res.status(401).json({msg: "Usuário não possui TOKEN de acesso."}).end()
        return
    }

    const [, token] = authToken.split(" ")

    try {
        const { sub } = verify(token, secret) as Payload;

        req.userId = sub;

        return next()
    } catch (error) {
        res.status(401).json({msg: "O não possui TOKEN de acesso."}).end();
        return
    }

}