import dayjs from "dayjs";
import mongoose, { Document, Schema } from "mongoose";

export interface IEmail extends Document {
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
            const date = dayjs().add(40, "year").startOf("year").toDate();
            return date;
        },
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const Email = mongoose.model<IEmail>("Email", EmailSchema);
