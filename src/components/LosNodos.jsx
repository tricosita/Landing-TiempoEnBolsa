import { nodos, nodoExpo } from '../data/nodos'
import styles from './LosNodos.module.css'

export default function LosNodos() {
  return (
    <section className="seccion">
      <div className="sec-num">04 — EL ECOSISTEMA TRANSMEDIA</div>
      <div className="sec-titulo">LOS NODOS</div>
      <div className={styles.grid}>
        {nodos.map((n) => (
          <div key={n.id} className={styles.card}>
            <div className={styles.num}>NODO {n.id}</div>
            <span className={styles.emoji}>{n.emoji}</span>
            <h3 className={styles.titulo}>{n.titulo}</h3>
            <p className={styles.subtitulo}>{n.subtitulo}</p>
            <div className={styles.rule} />
            <p className={styles.desc}>{n.desc}</p>
          </div>
        ))}

        {/* exposición — full width */}
        <div className={`${styles.card} ${styles.expo}`}>
          <div className={styles.expoLeft}>
            <div className={styles.num}>NODO {nodoExpo.id}</div>
            <span className={styles.emoji} style={{ fontSize: 28 }}>{nodoExpo.emoji}</span>
            <div className={styles.expoBadge}>Evento de cierre</div>
            <h3 className={`${styles.titulo} ${styles.expoTitulo}`}>{nodoExpo.titulo}</h3>
            <p className={styles.subtitulo}>{nodoExpo.subtitulo}</p>
          </div>
          <div className={styles.expoRight}>
            <div className={styles.rule} />
            <p className={`${styles.desc} ${styles.expoDesc}`}>{nodoExpo.desc}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
