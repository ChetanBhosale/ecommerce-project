import mongoose, { Document, Schema, Model, ObjectId, mongo } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AccessTokenSecret, RefreshTokenSecret } from "../example.env";
import { cartModel, ICart } from "./product";

// User Interface
export interface IUser extends Document {
  _id: string;
  email: string;
  password: string;
  avatar: {
    public_id: string;
    url: string;
  };
  role: string;
  cart : ICart | string
  createCart: (id: string) => Promise<void>;
  comparedPassword: (password: string) => Promise<boolean>;
  SignAccessToken: () => string;
  SignRefreshToken: () => string;
}

// Email Regex Pattern
const emailRegaxPattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// User Schema
const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'please enter your email'],
      validate: {
        validator: function (value: string) {
          return emailRegaxPattern.test(value);
        }
      }
    },
    password: {
      type: String,
      required: [true, 'please enter password'],
    },
    avatar: {
      public_id: String,
      url: String
    },
    role: {
      type: String,
      enum: ["USER", "SELLER"]
    },
    cart : {
      type : mongoose.Schema.Types.ObjectId,
      ref : "cart"
    }
  },
  { timestamps: true }
);

// Pre-save Middleware for Password Hashing
userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to Create Cart
userSchema.methods.createCart = async function (id: string) {
  let data = await cartModel.create({ user: id });
  return data
};

// Method to Compare Password
userSchema.methods.comparedPassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Method to Sign Access Token
userSchema.methods.SignAccessToken = function () {
  return jwt.sign({ id: this._id }, AccessTokenSecret!);
};

// Method to Sign Refresh Token
userSchema.methods.SignRefreshToken = function () {
  return jwt.sign({ id: this._id }, RefreshTokenSecret!);
};

// User Model
export const userModel: Model<IUser> = mongoose.model('user', userSchema);

// User Address Interface
export interface IAddress extends Document {
  name : string,
  contact1: number;
  contact2:number;
  lane1: string;
  lane2: string;
  zipcode: number;
  city: string;
  state: string;
  country: string;
  user ?: string;
}

// User Address Schema
const userAddressSchema: Schema<IAddress> = new mongoose.Schema({
  lane1: {
    type: String,
    required: true
  },
  lane2: String,
  zipcode: Number,
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  name : {
    type : String,
    required : [true,'please enter your name']
  },
  contact1 : {
    type : Number,
    required : [true,'please enter contact number']
  },
  contact2 : {
    type : Number
  }
});

// User Address Model
export const userAddressModel: Model<IAddress> = mongoose.model('userAddress', userAddressSchema);
