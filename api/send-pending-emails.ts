import type { VercelRequest, VercelResponse } from "@vercel/node";
import { EmailService } from "../src/services/EmailService";

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Método não permitido" });
    }

    const emailService = new EmailService();

    try {
        const result = await emailService.sendPendingEmail();
        return res.json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erro interno ao processar emails" });
    }
}
