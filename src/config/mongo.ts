import mongoose from "mongoose";

export const connectDatabase = async () => {
    const uri = process.env.MONGO_URI;

    if (!uri) {
        throw new Error("URI não fornecida");
    }

    try {
        await mongoose.connect(uri);
        console.log("✅ Conectado ao banco de dados");
    } catch (error) {
        console.error("❌ Erro ao conectar ao banco de dados");
        process.exit(1); // encerra a aplicação node
    }
};
