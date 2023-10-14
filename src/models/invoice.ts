import { Schema, model, models } from "mongoose";

const InvoiceSchema = new Schema({
  date:{
    type: Date,
    required: [true, 'la fecha es requerida']
  },
  consumption:{
    type: Number,
    required: [true, 'El consumo es requerido']
  },
  service: {
    type: String,
    enum: ['water', 'gas', 'electricity'],
    required: [true, 'El servicio es requerido']
  },
  amount: {
    type: Number,
    required: [true, 'La cantidad es requerida']
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

const Invoice = models.Invoice || model('Invoice', InvoiceSchema);

export default Invoice;