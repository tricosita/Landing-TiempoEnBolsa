import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section className={styles.hero}>
      {/* imagen de fondo — reemplazar con <img> o <video> */}
      <div className={styles.bg}>
        <p className={styles.bgHint}>
          <strong>[ IMAGEN / VIDEO DE FONDO ]</strong>
          Fotografía o video del predio · horizontal · alta resolución<br />
          Overlay negro al 70% · video: mp4 muted autoplay loop<br />
          Recomendado: toma larga, luz rasante, espacio vacío
        </p>
      </div>

      <div className={styles.ghost}>
        MEMORIA TERRITORIO BOLSA TIEMPO PILAR INVESTIGACIÓN PELLEGRINI ARTE TECNOLOGÍA ARCHIVO MEMORIA TERRITORIO BOLSA
      </div>

      <div className={styles.content}>
        <p className={styles.eyebrow}>Instituto Pellegrini · Pilar, Buenos Aires</p>
        <h1 className={styles.title}>TIEMPO<br />EN BOLSA</h1>
        <div className={styles.rule} />
        <p className={styles.sub}>Laboratorio de Investigación Territorial</p>
        <div className={styles.meta}>
          <span>Activo desde 2025</span>
          <span>·</span>
          <span>Territorio · Tecnología · Arte</span>
        </div>
      </div>
    </section>
  )
}
