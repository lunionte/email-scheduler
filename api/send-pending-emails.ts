import type { VercelRequest, VercelResponse } from "@vercel/node";
import { EmailService } from "../src/services/EmailService";
import { connectDatabase } from "../src/config/mongo";

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Método não permitido" });
    }
    try {
        await connectDatabase();
        const emailService = new EmailService();

        const result = await emailService.sendPendingEmail();
        return res.json({ message: "Processamento concluído", result });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erro interno ao processar emails" });
    }
}
