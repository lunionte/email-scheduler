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
        return await this.repo.findPending();
    }
}
