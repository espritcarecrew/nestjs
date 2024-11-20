import mongoose, { Document } from 'mongoose';
export declare class RefreshToken extends Document {
    token: string;
    userId: mongoose.Types.ObjectId;
    expiryDate: Date;
}
export declare const RefreshTokenSchema: mongoose.Schema<RefreshToken, mongoose.Model<RefreshToken, any, any, any, mongoose.Document<unknown, any, RefreshToken> & RefreshToken & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, RefreshToken, mongoose.Document<unknown, {}, mongoose.FlatRecord<RefreshToken>> & mongoose.FlatRecord<RefreshToken> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
