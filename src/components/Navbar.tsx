'use client'
import { useSession } from "next-auth/react"
import { signOut } from "next-auth/react"
import Link from "next/link";

function Navbar() {

  const { data: session } = useSession();
  return (
    <nav>
      <Link  href="/">
      Home
      </Link>

      <ul>
          {session ? (
            <>
              <li>
                <Link href="/dashboard/profile">Perfil</Link>
              </li>
              <button onClick= {async () =>  await signOut()}>
                Cerrar sesión
              </button>
            </>
          ):
          (
            <>
              <li>
                <Link href="/login">Iniciar sesión</Link>
              </li>
              <li>
                <Link href="/register">Registrarse</Link>
              </li>
            </>
          )}
      </ul>
    </nav>
  )
}

export default Navbar