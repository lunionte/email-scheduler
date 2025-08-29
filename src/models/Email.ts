import { Joi } from "celebrate";
import dayjs from "dayjs";
import mongoose, { Document, Schema } from "mongoose";

export interface IEmail extends Document {
    _id: string;
    email: string;
    subject: string;
    content: string;
    sent: boolean;
    sendAt: Date;
    createdAt: Date;
}

const EmailSchema: Schema<IEmail> = new mongoose.Schema({
    email: { type: String, required: true },
    subject: { type: String, required: true },
    content: { type: String, required: true },
    sent: { type: Boolean, default: false },
    sendAt: {
        type: Date,
        default: () => {
            const date = dayjs().add(40, "years").toDate();
            return date;
        },
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const Email = mongoose.model<IEmail>("Email", EmailSchema);

export const newEmailSchema = Joi.object().keys({
    email: Joi.string().email().required().trim(),
    subject: Joi.string().max(100).trim(),
    content: Joi.string().max(500).required().trim(),
});
