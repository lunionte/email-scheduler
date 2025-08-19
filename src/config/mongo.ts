// src/config/mongo.ts
import mongoose from "mongoose";

let isConnected = false;

export const connectDatabase = async () => {
    if (isConnected) {
        console.log("⚡ Reutilizando conexão com MongoDB");
        return;
    }

    const uri = process.env.MONGO_URI;
    if (!uri) {
        throw new Error("URI não fornecida");
    }

    try {
        console.log("📶 Tentando conexão com o banco de dados...");
        const db = await mongoose.connect(uri);

        isConnected = !!db.connections[0].readyState;
        console.log("✅ Conectado ao banco de dados");
    } catch (error) {
        console.error("❌ Erro ao conectar ao banco de dados", error);
        throw error;
    }
};
