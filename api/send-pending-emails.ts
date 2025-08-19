import type { VercelRequest, VercelResponse } from "@vercel/node";
import { EmailService } from "../src/services/EmailService";
import { connectDatabase } from "../src/config/mongo";

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Método não permitido" });
    }
    await connectDatabase();

    const emailService = new EmailService();

    try {
        console.log("Criando email no db...");
        const result = await emailService.sendPendingEmail();
        console.log("✅ Email criado:", result);
        return res.json(result);
    } catch (error) {
        console.error("Erro ao salvar:", error);
        return res.status(500).json({ message: "Erro interno ao processar emails" });
    }
}
