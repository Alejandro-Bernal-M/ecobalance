import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Correo electrónico" },
        password: { label: "Contraseña", type: "password", placeholder: "Contraseña" }
      },
      async authorize(credentials, req){
        const user = { id: 1, name: "John Doe", email: "", password: ""}

        return user;
      }
    })
  ]
})

export { handler as GET, handler as POST }