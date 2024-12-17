import { Model, Schema} from "mongoose";

const accountSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

export const Account = Model.create("Account", accountSchema);