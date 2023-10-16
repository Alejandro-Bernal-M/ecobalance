'use client'
import { useSession } from "next-auth/react"
import { signOut } from "next-auth/react"
import Link from "next/link";
import styles from './navbar.module.css';
import { ImLeaf } from 'react-icons/im';

function Navbar() {

  const { data: session } = useSession();
  return (
    <nav className={styles.nav}>
      <Link  href="/">
      EcoBalance <ImLeaf />
      </Link>

      <ul className={styles.ul}>
          {session ? (
            <>
              <li className={styles.list_item}>
                <Link href="/dashboard/profile">Perfil</Link>
              </li>
              <button className={styles.btn} onClick= {async () =>  await signOut()}>
                Cerrar sesión
              </button>
            </>
          ):
          (
            <>
              <li className={styles.list_item}>
                <Link href="/login">Iniciar sesión</Link>
              </li>
              <li className={styles.list_item}>
                <Link href="/register">Registrarse</Link>
              </li>
            </>
          )}
      </ul>
    </nav>
  )
}

export default Navbar