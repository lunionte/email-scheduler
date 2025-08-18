import { Router } from "express";
import { EmailController } from "../controllers/EmailController";

export const emailRoute = Router();

emailRoute.post("/scheduler", EmailController.create);
emailRoute.get("/all", EmailController.sendPendingEmails);
