import { Email, IEmail } from "../models/Email";

export class EmailRepository {
    async create(data: Partial<IEmail>) {
        return new Email(data).save();
    }

    async findPending(limit = 100) {
        return Email.find({
            sent: false,
            sendAt: { $lte: new Date() }, // só acha os que são less than equal (menor ou igual) que a data de agora
        })
            .sort({ sendAt: 1 }) // os mais antigos primeiro
            .limit(limit)
            .exec();
    }
}
