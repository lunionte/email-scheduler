import { Request, Response } from "express";
import { EmailService } from "../services/EmailService";

export class EmailController {
    static async create(req: Request, res: Response) {
        const { email, subject, content } = req.body;
        const response = await new EmailService().createDB(
            email,
            subject,
            content
        );

        res.status(201).json({ message: "Email criado com sucesso", response });
    }

    static async sendPendingEmails(req: Request, res: Response) {
        const info = await new EmailService().sendPendingEmail();
        res.json(info);
    }
    static async findAllEmails(req: Request, res: Response) {
        const info = await new EmailService().findAllEmails();
        res.json(info);
    }
}
