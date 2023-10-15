import styles from './page.module.css';
import { ImLeaf } from 'react-icons/im';

export default function Home() {
  return (
    <section  className={styles.section}>
      <div className={styles.main_div}>
        <h1>EcoBalance <ImLeaf /></h1>
        <p>Sigue el consumo de tu hogar.</p>
      </div>
    </section>
  )
}
