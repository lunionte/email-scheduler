import { VercelRequest, VercelResponse } from "@vercel/node";
import { newEmailSchema } from "../src/models/Email";
import { connectDatabase } from "../src/config/mongo";

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== "POST") {
        console.log("Console.log: Método não permitido");
        return res.status(405).json({ message: "Método não permitido" });
    }

    await connectDatabase();

    // adaptando validação do joi
    const { error } = newEmailSchema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({ message: "Validação falhou", details: error.details.map((d) => d.message) });
    }

    try {
        console.log("Iniciando teste de resposta rápida...");
        // Simula delay curto
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return res.json({ message: "Test OK" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erro no teste" });
    }
}
