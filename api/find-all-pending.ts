import { VercelRequest, VercelResponse } from "@vercel/node";
import { connectDatabase } from "../src/config/mongo";
import { EmailService } from "../src/services/EmailService";

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Método não permitido" });
    }

    try {
        await connectDatabase();
        const emailService = new EmailService();

        const result = await emailService.findAllEmails();
        return res.json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: " Erro na conexão com banco" });
    }
}
