import { NextFunction, Request, Response } from "express";
import xss from "xss";

export const sanatizeXss = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (req.body) {
        Object.keys(req.body).forEach((key) => {
            req.body[key] = xss(req.body[key]);
        });
    }
    next();
};
