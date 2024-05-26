import mongoose, { Document, Schema, Model, ObjectId, mongo } from "mongoose";
import { IUser } from "./user";

export const categories = [
  "Electronics and Gadgets",
  "Fashion and Apparel",
  "Health and Beauty",
  "Home and Living",
  "Sports and Outdoors",
  "Books and Media",
  "Toys and Baby Products",
  "Groceries and Gourmet Food",
];

export interface IImage {
  public_id: string;
  url: string;
}

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  less: number;
  color: Array<string>;
  size: Array<string>;
  category: string;
  images?: Array<IImage>;
  user?: IUser;
  state: string;
  totalPurchase: number;
}

export const productState = ["available", "out of stock", "disable"];

const productSchema: Schema<IProduct> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please provide name of the product"],
    },
    description: {
      type: String,
      required: [true, "please provide description of the product"],
    },
    color: [
      {
        type: String,
      },
    ],
    size: [
      {
        type: String,
      },
    ],
    price: {
      type: Number,
      required: [true, "please provide before discount price of the product"],
    },
    less: {
      type: Number,
      required: [true, "please provide discount price of the product"],
    },
    category: {
      type: String,
      required: [true, "please select category of your product"],
      enum: categories,
    },
    images: [
      {
        public_id: String,
        url: String,
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    state: {
      type: String,
      enum: productState,
      default: "available",
    },
    totalPurchase: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const productModel: Model<IProduct> = mongoose.model(
  "product",
  productSchema
);

// cart schema

export interface IcartProduct extends Document {
  _id: ObjectId;
  product: IProduct;
  color: "";
  size: "";
  quantity: number;
}

const cartProductSchema: Schema<IcartProduct> = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
    required: [true, "please select the product!"],
  },
  color: String,
  size: String,
  quantity: {
    type: Number,
    default: 1,
  },
});

export const cartProductModel: Model<IcartProduct> = mongoose.model(
  "cartProduct",
  cartProductSchema
);

export interface ICart extends Document {
  _id: string;
  products: IcartProduct[];
  user: IUser;
  total: number;
}

const cartSchema: Schema<ICart> = new mongoose.Schema({
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cartProduct",
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
    unique: true,
  },
  total: {
    type: Number,
  },
});

export const cartModel: Model<ICart> = mongoose.model("cart", cartSchema);
