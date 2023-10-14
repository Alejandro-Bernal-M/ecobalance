import { Schema, model, models } from "mongoose";

const AlertSchema = new Schema({
  amount: {
    type: Number,
    required: [true, 'La cantidad es requerida']
  },
  service: {
    type: String,
    enum: ['water', 'gas', 'electricity'],
    required: [true, 'El servicio es requerido']
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Invoice',
    required: [true, 'El usuario es requerido']
  }
});

const Alert = models.Alert || model('Alert', AlertSchema);

export default Alert;