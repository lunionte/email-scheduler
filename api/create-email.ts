import { VercelRequest, VercelResponse } from "@vercel/node";
import { newEmailSchema } from "../src/models/Email";
import { EmailService } from "../src/services/EmailService";

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== "POST") {
        console.log("Console.log: Método não permitido");
        return res.status(405).json({ message: "Método não permitido" });
    }

    // adaptando validação do joi
    const { error } = newEmailSchema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({ message: "Validação falhou", details: error.details.map((d) => d.message) });
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
