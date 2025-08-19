import mongoose from "mongoose";

let cachedConnection: typeof mongoose | null = null;

export const connectDatabase = async () => {
    if (cachedConnection) {
        // Reutiliza a conexão existente
        return cachedConnection;
    }

    const uri = process.env.MONGO_URI;
    if (!uri) {
        throw new Error("URI não fornecida");
    }

    try {
        cachedConnection = await mongoose.connect(uri);
        console.log("✅ Conectado ao banco de dados");
        return cachedConnection;
    } catch (error) {
        console.error("❌ Erro ao conectar ao banco de dados", error);
        throw error; // não encerre a função, só jogue o erro
    }
};
