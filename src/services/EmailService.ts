import nodemailer from "nodemailer";
import { EmailRepository } from "../repositories/EmailRepository";

export class EmailService {
    private transporter;
    private repo;
    constructor() {
        (this.transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        })),
            (this.repo = new EmailRepository());
    }

    async createDB(email: string, subject: string, content: string) {
        return await this.repo.create({ email, subject, content });
    }

    // cron vai chamar
    async sendPendingEmail() {
        console.log("Entrou em sendPendingEmail");

        return { ok: true };

        // retorna uma array de documentos
        const pendings = await this.repo.findPending();
        const failed: string[] = [];
        if (pendings.length === 0) {
            return { message: "Nenhum email foi enviado" };
        }
        const sendPromises = pendings.map((emailDoc) =>
            this.transporter
                .sendMail({
                    from: process.env.EMAIL_USER,
                    to: emailDoc.email,
                    subject: emailDoc.subject,
                    text: emailDoc.content,
                })
                .then(() => this.repo.markAsSent(emailDoc._id.toString()))
                .catch((err) => failed.push(emailDoc._id.toString()))
        );

        await Promise.allSettled(sendPromises);

        return {
            totalAttempts: pendings.length,
            totalSent: pendings.length - failed.length,
            totalFailed: failed.length,
        };
    }

    async findAllEmails() {
        return await this.repo.findAllEmails();
    }
}
