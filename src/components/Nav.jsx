import styles from './Nav.module.css'

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>Tiempo en Bolsa — Lab</div>
      <div className={styles.ejes}>
        <span className={`${styles.pill} ${styles.t}`}>Territorio</span>
        <span className={`${styles.pill} ${styles.te}`}>Tecnología</span>
        <span className={`${styles.pill} ${styles.a}`}>Arte</span>
      </div>
    </nav>
  )
}
