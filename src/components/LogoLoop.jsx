import styles from './LogoLoop.module.css'

export default function LogoLoop({
  logos        = [],
  speed        = 30,
  direction    = 'left',
  logoHeight   = 40,
  gap          = 60,
  hoverSpeed   = 0,
  scaleOnHover = false,
  fadeOut      = false,
  fadeOutColor = '#080808',
  ariaLabel    = 'Logo loop',
}) {
  if (!logos.length) return null
  const items = [...logos, ...logos]

  return (
    <div
      className={styles.wrapper}
      aria-label={ariaLabel}
      style={{
        '--h':   `${logoHeight}px`,
        '--gap': `${gap}px`,
        '--dur': `${speed}s`,
        '--dir': direction === 'left' ? 'normal' : 'reverse',
      }}
    >
      {fadeOut && <>
        <div className={styles.fadeL} style={{ '--fc': fadeOutColor }} />
        <div className={styles.fadeR} style={{ '--fc': fadeOutColor }} />
      </>}

      <div className={`${styles.track} ${hoverSpeed === 0 ? styles.pauseHover : ''}`}>
        {items.map((logo, i) => {
          const inner = logo.node
            ? <span className={styles.icon}>{logo.node}</span>
            : <img src={logo.src} alt={logo.alt ?? ''} className={styles.img} />

          return logo.href
            ? <a key={i} href={logo.href} target="_blank" rel="noreferrer"
                 className={`${styles.item} ${scaleOnHover ? styles.scale : ''}`}
                 aria-label={logo.title ?? logo.alt ?? ''}>{inner}</a>
            : <span key={i} className={`${styles.item} ${scaleOnHover ? styles.scale : ''}`}>{inner}</span>
        })}
      </div>
    </div>
  )
}
