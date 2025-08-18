import { configDotenv } from "dotenv";
import express from "express";
import { emailRoute } from "./routes/EmailRoute";
import { connectDatabase } from "./config/mongo";
import { errors } from "celebrate";
import { sanatizeXss } from "./middlewares/sanatizexss";

const app = express();
app.use(express.json());
app.use(sanatizeXss);

configDotenv();

connectDatabase();
app.use("/api/emails", emailRoute);

const PORT = process.env.PORT;

app.use(errors());
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
