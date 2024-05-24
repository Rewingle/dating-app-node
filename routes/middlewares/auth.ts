import { Express } from "express"

export const auth = (req: { body: any }, res: { status: (arg0: number) => void }, next: () => void) => {

    if (req.body) {

        next()
    }else{
        res.status(403)
    }

}