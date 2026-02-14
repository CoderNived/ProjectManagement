import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    avatar: {
      url: {
        type: String,
        default:
          "https://res.cloudinary.com/dlqjz8h1o/image/upload/v1690794415/default-avatar_ajy7nq.png",
      },
      localPath: {
        type: String,
        default: null,
      },
    },

    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },

    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    refreshToken: {
      type: String,
      default: null,
    },

    forgotPasswordToken: {
      type: String,
      default: null,
    },

    forgotPasswordTokenExpiry: {
      type: Date,
      default: null,
    },

    emailVerificationExpiry: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }   
})
export const User = mongoose.model("User", userSchema);
