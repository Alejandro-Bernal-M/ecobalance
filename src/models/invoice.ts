import { Schema, model, models } from "mongoose";

const InvoiceSchema = new Schema({
  date: String,
  consumption: Number,
  service: {
    type: String,
    enum: ['water', 'gas', 'electricity'],
  },
  amount: Number,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  }
})

const Invoice = models.Invoice || model('Invoice', InvoiceSchema);

export default Invoice;