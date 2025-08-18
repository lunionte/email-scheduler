import { configDotenv } from "dotenv";
import express from "express";
import { emailRoute } from "./routes/EmailRoute";
import { connectDatabase } from "./config/mongo";

const app = express();
app.use(express.json());

configDotenv();

connectDatabase();
app.use("/api/emails", emailRoute);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
