import { VercelRequest, VercelResponse } from "@vercel/node";
import { newEmailSchema } from "../src/models/Email";
import { EmailService } from "../src/services/EmailService";
import { connectDatabase } from "../src/config/mongo";

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Método não permitido" });
    }

    try {
        await connectDatabase();
    } catch (err) {
        return res.status(500).json({ message: "Erro na conexão com o banco" });
    }

    // validação joi
    const { error } = newEmailSchema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({
            message: "Validação falhou",
            details: error.details.map((d) => d.message),
        });
    }

    const { email, subject, content } = req.body;
    const emailService = new EmailService();

    try {
        const result = await emailService.createDB(email, subject, content);
        return res.json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erro ao criar email" });
    }
}
