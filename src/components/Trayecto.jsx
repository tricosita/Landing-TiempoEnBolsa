import { timeline, galeria } from '../data/nodos'
import styles from './Trayecto.module.css'

export default function Trayecto() {
  return (
    <section className="seccion">
      <div className="sec-num">05 — APERTURA + CONSOLIDACIÓN</div>
      <div className="sec-titulo">TRAYECTO</div>

      <div className={styles.timeline}>
        {timeline.map((item, i) => (
          <div key={i} className={styles.item}>
            <div className={styles.fecha}>{item.fecha}</div>
            <p className={styles.texto}>{item.texto}</p>
          </div>
        ))}
      </div>

      <div className={styles.galeriaGrid}>
        {galeria.map((g) => (
          <div key={g.num} className={styles.galeriaItem}>
            <span className={styles.galeriaNum}>{g.num}</span>
            <p className={styles.galeriaHint}>
              <strong>[ IMAGEN / VIDEO ]</strong>
              {g.hint}<br />
              Formato: 4:3 o cuadrado · jpg, png, mp4
            </p>
            <span className={styles.galeriaTipo}>img o mp4</span>
          </div>
        ))}
      </div>
    </section>
  )
}
