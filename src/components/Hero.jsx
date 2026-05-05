import styles from './Hero.module.css'
import LightRays from './LightRays'

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.bg} />

      <div className={styles.rays}>
        <LightRays
          raysOrigin="top-center"
          raysColor="#785656"
          raysSpeed={1}
          lightSpread={0.5}
          rayLength={3}
          followMouse={true}
          mouseInfluence={0.1}
          fadeDistance={1}
        />
      </div>

      <div className={styles.ghost}>
        MEMORIA TERRITORIO TIEMPO PILAR INVESTIGACIÓN PELLEGRINI ARTE TECNOLOGÍA ARCHIVO MEMORIA TERRITORIO TRANSMEDIA
      </div>

      <div className={styles.content}>
        <p className={styles.eyebrow}>Instituto Pellegrini · Pilar, Buenos Aires</p>
        <h1 className={styles.title}>
          {['TIEMPO', 'EN BOLSA'].map((word, wi) => (
            <span key={wi} style={{ display: 'block' }}>
              {word.split('').map((l, li) => (
                <span
                  key={li}
                  className={styles.letter}
                  style={{ animationDelay: `${(wi === 0 ? li : 6 + li) * 65}ms` }}
                >
                  {l}
                </span>
              ))}
            </span>
          ))}
        </h1>
        <div className={styles.rule} />
        <p className={styles.sub}>Laboratorio de Investigación Territorial</p>
        <div className={styles.meta}>
          <span>En proceso desde 2025</span>
          <span>·</span>
          <span>Territorio · Tecnología · Arte</span>
        </div>
      </div>
    </section>
  )
}
