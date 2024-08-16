import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    name: { type: String, require: true },
    description: { type: String, require: true },
    price: { type: Number, require: true },
    image: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

export const productModel = model("product", productSchema);


/*
import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";




export const productCollectionName = "products";

export const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  section: { type: String, required: true },
  active: { type: String, required:true },
});

productSchema.plugin(mongoosePaginate);

export const ProductModel = model(productCollectionName, productSchema); */