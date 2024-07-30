import mongoose, { Document, Schema } from "mongoose";

export interface UserSubscriptionInterface extends Document {
    username: string;
    email: string;
    active: boolean;
    paymentId: string;
    joinDate: Date;
}

const UserSubscriptionSchema: Schema<UserSubscriptionInterface> = new Schema({
    username: {
        type: String,
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
        match: [/.+\@.+\..+/, "please use a valid email address"],
    },
    active: {
        type: Boolean,
        default: false,
    },
    paymentId: {
        type: String,
    },
    joinDate: {
        type: Date,
        default: Date.now
    }
})

const UserSubscription = (mongoose.models.UserSubscription as mongoose.Model<UserSubscriptionInterface>) || mongoose.model<UserSubscriptionInterface>("UserSubscription", UserSubscriptionSchema);

export default UserSubscription