import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/libs/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import toast from "react-hot-toast";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Correo electrónico" },
        password: { label: "Contraseña", type: "password", placeholder: "Contraseña" }
      },
      async authorize(credentials, req){
        try {
          await connectDB();
          console.log('auth')
          console.log('credentials', credentials)
          const userFound = await User.findOne({email: credentials?.email}).select('+password');
          if(!userFound) {
            toast.error('Usuario o contraseña incorrectos');
            return;
          }
          console.log('userFound', userFound)
          const passwordMatch = await bcrypt.compare(credentials!.password, userFound.password);
          console.log('passwordMatch', passwordMatch)
          if(!passwordMatch) throw new Error('Usuario o contraseña incorrectos');
          console.log('passwordMatch', passwordMatch);
          
          return userFound;
        } catch (error) {
          console.log(error)
          if(error instanceof Error){
            return toast.error(error.message);
          }
        }
      }
    })
  ],
  callbacks: {
    jwt({token, user}){
      if(user){
        token.user = user;
      }
      return token;
    },
    session({session, token}){
      session.user = token.user as any;
      return session;
    },
  },
  pages: {
    signIn: '/login',
    signOut: '/logout',
  }
})

export { handler as GET, handler as POST }