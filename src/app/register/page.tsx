'use client'
import styles from './register.module.css';
import { FormEvent } from 'react';
import toast from 'react-hot-toast'; 
import axios from 'axios';

function RegisterPage() {

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
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
    
    axios.post('/api/auth/signup', {
      fullname,
      age,
      email,
      password,
      password_confirmation
    }).then(() => {
      toast.success('Usuario registrado con éxito');
    }).catch((err) => {
      toast.error(err.response.data.message);
    })

  }
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Registrarse</button>
      </form>
    </div>
  )
}

export default RegisterPage