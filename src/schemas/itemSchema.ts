import mongoose, { Document, Schema } from "mongoose";

export interface ItemDocument extends Document {
  name: string;
  description: string;
  price: number;
  image: string;
}

const itemSchema = new Schema<ItemDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Item = mongoose.model<ItemDocument>("Item", itemSchema);
