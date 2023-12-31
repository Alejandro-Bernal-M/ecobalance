import { NextResponse } from "next/server";
import User from "@/models/user";
import { connectDB } from "@/libs/mongodb";
import bcrypt from "bcryptjs";

export async function POST( request : Request){
  const {fullname, age, email, password} = await request.json();
  
  if(!password || password.length < 8){
    return NextResponse.json({ message: "La contraseña debe ser de al menos 8 caracteres" }, {status: 400})
  }

  try {
    await connectDB();
    const userFound = await User.findOne({email})
    if(userFound){
      return NextResponse.json({message: "El correo ya está registrado"}, {status: 400})
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = new User({
      fullname,
      age,
      email,
      password: hashedPassword
    });

    const savedUser = await user.save();

    return NextResponse.json({ savedUser })
  } catch (error) {
    if(error instanceof Error){
      console.log(error);
      return NextResponse.json({message: error.message}, {status: 500})
    }
  }
}