import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    index: true,
    unique: true,
    required: [true, "El correo es requerido"],
    match: /.+\@.+\..+/,
  },
  age: {
    type: Number,
    required: true,
    min: [8, "Debe ser mayor de 8 años"],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
})

const User = models.User ||  model("User", UserSchema);
export default User;