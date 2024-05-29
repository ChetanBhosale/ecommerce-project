import { IProduct } from "./product";
import { IAddress, IUser } from "./user";
import mongoose, { Document, Schema, Model, mongo } from "mongoose";

export const deliverState = [
  "processing",
  "dispatch",
  "delivered",
  "cancelled",
];

export interface IOrdered extends Document {
  purchaser: string | IUser;
  seller: string | IUser;
  address: IAddress;
  product: string | IProduct;
  quanity: number;
  price: number;
  totalPrice: number;
  deliverState: string;
  paymentStatus: string;
}

const OrderedSchema: Schema<IOrdered> = new mongoose.Schema({
  purchaser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: [true, "purchaser required!"],
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: [true, "seller required!"],
  },
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "address",
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
  },
  price: {
    type: Number,
    required: true,
  },
  totalPrice: Number,
  deliverState: {
    type: String,
    enum: deliverState,
  },
  paymentStatus: String,
});

export const OrderModel: Model<IOrdered> = mongoose.model(
  "order",
  OrderedSchema
);

interface IPaymentTransfer extends Document {
  amount: String;
  user: String | IUser;
  order: IOrdered | string;
  withdrawed: boolean;
}

const paymentTransferSchema: Schema<IPaymentTransfer> = new mongoose.Schema({
  amount: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "order",
  },
  withdrawed: Boolean,
});

export const paymentTranserModel: Model<IPaymentTransfer> = mongoose.model(
  "paymentTransfer",
  paymentTransferSchema
);

interface IwithdrawPayment extends Document {
  payments: IPaymentTransfer[];
  total: Number;
  withdrawed: boolean;
}

const WithdrawPaymentSchema: Schema<IwithdrawPayment> = new mongoose.Schema({
  payments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "paymentTransfer",
    },
  ],
  total: Number,
  withdrawed: Boolean,
});

export const withdrawPaymentModel: Model<IwithdrawPayment> = mongoose.model(
  "withdrawPayment",
  WithdrawPaymentSchema
);
