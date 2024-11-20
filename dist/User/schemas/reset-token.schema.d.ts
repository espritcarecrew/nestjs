import mongoose, { Document } from 'mongoose';
export declare class ResetToken extends Document {
    token: string;
    userId: mongoose.Types.ObjectId;
    expiryDate: Date;
}
export declare const ResetTokenSchema: mongoose.Schema<ResetToken, mongoose.Model<ResetToken, any, any, any, mongoose.Document<unknown, any, ResetToken> & ResetToken & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, ResetToken, mongoose.Document<unknown, {}, mongoose.FlatRecord<ResetToken>> & mongoose.FlatRecord<ResetToken> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
