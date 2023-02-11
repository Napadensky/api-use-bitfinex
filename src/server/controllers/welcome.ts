import { Request, Response } from "express"

const welcome = (_req: Request, res: Response) => res.json({ message: "Welcome to RATHER API" })

const redirect = (_req: Request, res: Response) => res.redirect("/info")

export { welcome, redirect }
