import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
    username: { 
        type: String,
        required: [true, "Username is required"],
        minLength: [3, "Username must be at least 3 characters long"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email"
        }
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 8 characters long"]
    }
}, { timestamps: true });

UserSchema.pre("save", async function(next) {
    // validate emails uniqueness
    if (await this.constructor.findOne({ email: this.email })) {
        throw this.invalidate("email", "Email is already in use");
    } else {
        // hash the password before saving it to the database
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// define a static method for our model to handle login validations
UserSchema.statics.checkLogin = async function({ email, password }) { 
    const user = await this.findOne({ email });
    if (!(user && await bcrypt.compare(password, user.password))) {
        throw new this().invalidate("password", "Invalid Credentials");
    }
    return user;
};

const User = model("User", UserSchema); 
export default User;