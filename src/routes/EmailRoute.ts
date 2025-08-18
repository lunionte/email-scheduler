import { Router } from "express";
import { EmailController } from "../controllers/EmailController";
import { celebrate, Segments } from "celebrate";
import { newEmailSchema } from "../models/Email";

export const emailRoute = Router();

emailRoute.post(
    "/create-email",
    celebrate({ [Segments.BODY]: newEmailSchema }),
    EmailController.create
);
emailRoute.post("/send-scheduled", EmailController.sendPendingEmails);
emailRoute.get("/findAll", EmailController.findAllEmails);
