'use client'
import styles from './register.module.css';
import { FormEvent } from 'react';
import toast from 'react-hot-toast'; 
import axios, { AxiosError } from 'axios';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation'

function RegisterPage() {

  const router = useRouter();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const fullname = formData.get('fullname');
    const age = formData.get('age');
    const email = formData.get('email');
    const password = formData.get('password');
    const password_confirmation = formData.get('password_confirmation');

    if(!fullname || !age || !email || !password) {
      toast.error('Todos los campos son obligatorios');
      return;
    }

    if(password !== password_confirmation) {
      toast.error('Las contraseñas no coinciden');
      return;
    }
    
  try {
    const signupResponse = await axios.post('/api/auth/signup', {
      fullname,
      age,
      email,
      password
    });

    if(signupResponse?.data?.error) {
      console.log(signupResponse.data.error)
      toast.error(signupResponse.data.error);
      return;
    }

    const res = await signIn('credentials', {
      email,
      password,
      redirect: false
    });
    
    if(res?.error) {
      toast.error(res.error);
      return;
    }
    
    if(res?.ok) {
      router.push('/dashboard/profile');
      toast.success('Usuario registrado con éxito');
    }

  } catch (error) {
    if(error instanceof AxiosError){
      console.log(error)
      let message = error.response?.data.message.split(':');
      toast.error(message[message.length - 1] || 'Ha ocurrido un error');
      return;
    }
  }
}
  
  return (
    <section className={styles.section}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1>Registrarse</h1>
        <label htmlFor="name">Nombre completo</label>
        <input type="text" name="fullname" id="name" />
        <label htmlFor="age">Edad</label>
        <input type="number" name="age" id="age" />
        <label htmlFor="email">Correo electrónico</label>
        <input type="email" name="email" id="email" />
        <label htmlFor="password">Contraseña</label>
        <input type="password" name="password" id="password" />
        <label htmlFor="password_confirmation">Confirmar contraseña</label>
        <input type="password" name="password_confirmation" id="password_confirmation" />
        <button type="submit" className={styles.btn}>Registrarse</button>
      </form>
    </section>
  )
}

export default RegisterPage