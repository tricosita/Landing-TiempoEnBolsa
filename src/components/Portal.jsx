import { useEffect, useRef, useState } from 'react'
import styles from './Portal.module.css'

export default function Portal({ quote, author, audioSrc, audioDuration }) {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const active = Boolean(audioSrc)

  // Reset playing state if audioSrc is removed while a clip is playing
  useEffect(() => {
    if (!active) setPlaying(false)
  }, [active])

  function handleAudio() {
    if (!active) return
    if (playing) {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }
      setPlaying(false)
    } else {
      audioRef.current.play().then(() => {
        setPlaying(true)
      }).catch(() => {
        // play failed (network error, missing file, CORS)
      })
    }
  }

  function handleEnded() {
    setPlaying(false)
  }

  return (
    <section className={`seccion ${styles.portal}`}>
      {active && (
        <audio ref={audioRef} src={audioSrc} onEnded={handleEnded} />
      )}
      <div className={styles.eyebrow}>· fragmento de archivo ·</div>
      <p className={styles.quote}>"{quote}"</p>
      <div className={styles.rule} />
      <p className={styles.author}>{author}</p>
      <button
        className={`${styles.audioBtn}${active ? '' : ` ${styles.inactive}`}`}
        onClick={handleAudio}
        aria-disabled={!active}
        data-cursor="interactive"
      >
        <span className={styles.playRing}>
          {playing
            ? <span className={styles.stopRect} />
            : <span className={styles.triangle} />
          }
        </span>
        <span className={styles.audioText}>
          <span className={styles.audioLabel}>
            {active ? 'escuchar testimonio' : 'audio próximamente'}
          </span>
          <span className={styles.audioDur}>
            {active ? `${audioDuration} · audio original` : 'clip no disponible'}
          </span>
        </span>
      </button>
    </section>
  )
}
