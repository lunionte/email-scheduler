import { Router } from "express";
import { EmailController } from "../controllers/EmailController";

export const emailRoute = Router();

emailRoute.post("/create-email", EmailController.create);
emailRoute.post("/send-scheduled", EmailController.sendPendingEmails);
emailRoute.get("/findAll", EmailController.findAllEmails);
