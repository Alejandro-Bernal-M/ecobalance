'use client'

import { useSession } from "next-auth/react"

function Dashboard() {
  const { data: session } = useSession();
  return (
    <div>
      <h1>Perfil</h1>

      <p>Nombre: {session?.user?.name}</p>
      <p>Correo electrónico: {session?.user?.email}</p>

      <pre>
        {JSON.stringify(
          {session,
          status},
           null, 2)}
      </pre>
    </div>
  )
}

export default Dashboard