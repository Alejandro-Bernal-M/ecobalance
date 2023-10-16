'use client'
import { FormEvent } from 'react';
import toast from 'react-hot-toast'; 
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation'
import styles from './login.module.css';

function LoginPage() {

  const router = useRouter();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const email = formData.get('email');
    const password = formData.get('password');

    if( !email || !password) {
      toast.error('Todos los campos son obligatorios');
      return;
    }

    
  try {
    const res = await signIn('credentials', {
      email,
      password,
      redirect: false
    });

    if(res?.error) {
      toast.error('Error al iniciar sesión');
      return;
    }
    
    if(res?.ok) {
      router.push('/dashboard/profile');
      toast.success('Inicio de sesión exitoso');
    }

  } catch (error) {
    console.log('catch', error)
    toast.error('Error al iniciar sesión');
  }
}
  
  return (
    <section className={styles.section}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1>Iniciar sesión</h1>
        <label htmlFor="email">Correo electrónico</label>
        <input type="email" name="email" id="email" />
        <label htmlFor="password">Contraseña</label>
        <input type="password" name="password" id="password" />
        <button type="submit" className={styles.btn}>Iniciar sesión</button>
      </form>
    </section>
  )
}

export default LoginPage