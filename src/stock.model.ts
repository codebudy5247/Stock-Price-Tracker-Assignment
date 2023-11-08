import {
  DocumentType,
  getModelForClass,
  index,
  modelOptions,
  pre,
  prop,
} from "@typegoose/typegoose";

@modelOptions({
  schemaOptions: {
    // Add createdAt and updatedAt fields
    timestamps: true,
  },
})

export class Stock {
  @prop({ unique: true, required: true })
  company: string;

  @prop({ required: true })
  price: string;

  @prop({ required: true, minlength: 10, maxLength: 1000 })
  description: string;

  @prop({ required: true })
  symbol: string;
}

// Create the book model from the Book class
const stockModel = getModelForClass(Stock);
export default stockModel;
