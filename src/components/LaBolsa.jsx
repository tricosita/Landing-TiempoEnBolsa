import styles from './LaBolsa.module.css'

const ejes = [
  {
    eje: 'territorio',
    label: 'Territorio',
    texto: 'Pilar, GBA Norte. Un predio cargado de tiempo acumulado, de usos superpuestos, de memorias que no encontraron forma todavía.',
    style: 'italic',
    imgHint: '[ IMAGEN DE TERRITORIO ]\nVista del predio · exterior · paisaje\nFormato: vertical o cuadrado\nLuz natural, preferentemente',
  },
  {
    eje: 'tech',
    label: 'Tecnología',
    texto: 'Cartografía digital, geolocalización de registros, sistema de capas de información superpuesta. El archivo vivo como infraestructura.',
    style: 'op',
    imgHint: '[ IMAGEN DE TECNOLOGÍA ]\nCaptura de la web app o mapa digital\ndel predio con capas de información\nFormato: vertical o cuadrado',
  },
  {
    eje: 'arte',
    label: 'Arte',
    texto: 'el territorio como material. La bolsa como soporte, no como contexto. Práctica situada. Memoria no monumentalizada.',
    style: 'normal',
    imgHint: '[ IMAGEN DE PRÁCTICA ARTÍSTICA ]\nFanzine, ArtGame, VR o intervención\nImagen de producción artística\nFormato: vertical o cuadrado',
  },
]

export default function LaBolsa() {
  return (
    <section className="seccion">
      <div className="sec-num">03 — EL TERRITORIO</div>
      <div className="sec-titulo">LA BOLSA</div>
      <div className={styles.grid}>
        {ejes.map(({ eje, label, texto, style, imgHint }) => (
          <div key={eje} className={`${styles.bloque} ${styles[eje]}`}>
            <div className={styles.content}>
              <div className={`eje-nombre ${eje}`} style={{
                fontSize: 10.5,
                letterSpacing: 4,
                textTransform: 'uppercase',
                marginBottom: 16,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                color: eje === 'territorio' ? '#c8a96e' : eje === 'tech' ? '#4ecdc4' : '#ff6b9d'
              }}>
                <span className={styles.dot} />
                {label}
              </div>
              <p className={`eje-texto ${style === 'op' ? 'op' : style === 'up' ? 'up' : ''}`} style={{ fontSize: 15, lineHeight: 1.75, color: '#666', fontStyle: style === 'italic' ? 'italic' : 'normal' }}>
                {texto}
              </p>
              <p className={styles.hoverHint}>— hover para ver imagen —</p>
            </div>
            <div className={`${styles.imgReveal} ${styles[`img_${eje}`]}`}>
              <span className={styles.imgLabel}>{label}</span>
              <p className={styles.imgHint}>
                {imgHint.split('\n').map((line, i) => (
                  <span key={i}>{i === 0 ? <strong>{line}</strong> : line}<br /></span>
                ))}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
