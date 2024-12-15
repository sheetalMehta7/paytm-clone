import { Model, Schema } from "mongoose";

const userSchema = new Schema({
    firstname: {
        type: String,
        require: true,
        trim: true
    },
    lastname: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
});


export const User = Model.create('User', userSchema);