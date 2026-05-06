# Portales de Archivo — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add three Portal components between landing sections — each shows a real testimony fragment + a disabled audio button (activates when audio clips exist).

**Architecture:** New presentational component `Portal.jsx` reads data from `portales.js`. Three instances wired into `App.jsx` at predefined positions. Scroll reveal piggybacks on the existing `IntersectionObserver` via `className="seccion"`. Audio state is controlled by the presence of the `audioSrc` prop.

**Tech Stack:** React 19, Vite 8, JSX, CSS Modules, Space Mono (already loaded in project)

---

### Task 1: Create data file

**Files:**
- Create: `src/data/portales.js`

- [ ] **Step 1: Create the data file**

```js
export const portales = [
  {
    id: 'p1',
    quote: 'Nunca hablamos de lo que pasó ahí. Era nuestro, nada más. Esa era la forma que teníamos de cuidarlo.',
    author: 'Silvia Morales · testimonio 2026',
    audioSrc: undefined,
    audioDuration: '0:14',
  },
  {
    id: 'p2',
    quote: 'El tiempo ahí adentro era distinto al de afuera. Como si el predio tuviera su propio reloj.',
    author: 'Carlos Cenobio · testimonio 2026',
    audioSrc: undefined,
    audioDuration: '0:22',
  },
  {
    id: 'p3',
    quote: 'El predio seguía ahí. Nosotros habíamos cambiado. Eso es lo que el tiempo hace a los lugares.',
    author: 'Héctor Severini · testimonio 2026',
    audioSrc: undefined,
    audioDuration: '0:28',
  },
]
```

- [ ] **Step 2: Commit**

```bash
git add src/data/portales.js
git commit -m "feat: add portales archive data"
```

---

### Task 2: Create Portal styles

**Files:**
- Create: `src/components/Portal.module.css`

- [ ] **Step 1: Create the CSS module**

```css
.portal {
  min-height: 40vh;
  background: #050505;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 56px 48px;
  position: relative;
  border-top: 1px solid rgba(200, 169, 110, 0.06);
  border-bottom: 1px solid rgba(200, 169, 110, 0.06);
}

.portal::before,
.portal::after {
  content: '';
  position: absolute;
  left: 80px;
  right: 80px;
  height: 1px;
}

.portal::before {
  top: 0;
  background: linear-gradient(to right, transparent, rgba(200, 169, 110, 0.12), transparent);
}

.portal::after {
  bottom: 0;
  background: linear-gradient(to right, transparent, rgba(200, 169, 110, 0.12), transparent);
}

.eyebrow {
  font-size: 7px;
  letter-spacing: 5px;
  text-transform: uppercase;
  color: rgba(200, 169, 110, 0.2);
  margin-bottom: 28px;
}

.quote {
  font-size: clamp(14px, 1.6vw, 18px);
  font-style: italic;
  color: #5a5750;
  line-height: 1.85;
  max-width: 520px;
  margin-bottom: 24px;
  letter-spacing: 0.2px;
}

.rule {
  width: 32px;
  height: 1px;
  background: rgba(200, 169, 110, 0.18);
  margin-bottom: 16px;
}

.author {
  font-size: 7px;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: #2a2a22;
  margin-bottom: 20px;
}

.audioBtn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 6px 14px;
  border: 1px solid rgba(200, 169, 110, 0.15);
  background: transparent;
  cursor: pointer;
  transition: border-color 0.3s, background 0.3s;
  font-family: inherit;
}

.audioBtn:hover:not(.inactive) {
  border-color: rgba(200, 169, 110, 0.35);
  background: rgba(200, 169, 110, 0.04);
}

.inactive {
  opacity: 0.35;
  cursor: not-allowed;
  border-color: #111;
}

.playRing {
  width: 18px;
  height: 18px;
  border: 1px solid rgba(200, 169, 110, 0.3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.inactive .playRing {
  border-color: #1e1e1e;
}

.triangle {
  width: 0;
  height: 0;
  border-top: 4px solid transparent;
  border-bottom: 4px solid transparent;
  border-left: 5px solid var(--gold);
  margin-left: 1px;
  opacity: 0.7;
}

.stopRect {
  width: 6px;
  height: 6px;
  background: var(--gold);
  opacity: 0.7;
}

.inactive .triangle {
  border-left-color: #333;
}

.audioText {
  text-align: left;
}

.audioLabel {
  font-size: 7px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: rgba(200, 169, 110, 0.5);
  display: block;
}

.inactive .audioLabel {
  color: #2a2a2a;
}

.audioDur {
  font-size: 6px;
  letter-spacing: 1px;
  color: #252520;
  margin-top: 2px;
  display: block;
}

@media (max-width: 768px) {
  .portal {
    padding: 48px 24px;
  }

  .portal::before,
  .portal::after {
    left: 24px;
    right: 24px;
  }

  .quote {
    max-width: 100%;
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Portal.module.css
git commit -m "feat: add Portal CSS module"
```

---

### Task 3: Create Portal component

**Files:**
- Create: `src/components/Portal.jsx`

The component uses a `useRef` + `useState` to manage the `<audio>` element for play/stop toggle. When `audioSrc` is undefined, the button renders inactive and click does nothing.

- [ ] **Step 1: Create the component**

```jsx
import { useRef, useState } from 'react'
import styles from './Portal.module.css'

export default function Portal({ quote, author, audioSrc, audioDuration }) {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const active = Boolean(audioSrc)

  function handleAudio() {
    if (!active) return
    if (playing) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      setPlaying(false)
    } else {
      audioRef.current.play()
      setPlaying(true)
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
```

- [ ] **Step 2: Verify build passes**

```bash
cd "/Users/cosita/Library/Mobile Documents/com~apple~CloudDocs/Documents/Academico/Tiempo en bolsa/landing-tiempo-en-bolsa"
npm run build 2>&1 | tail -20
```

Expected: `✓ built in` with no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/Portal.jsx
git commit -m "feat: add Portal component"
```

---

### Task 4: Wire portals into App.jsx

**Files:**
- Modify: `src/App.jsx`

Insert three `<Portal>` instances at the positions defined in the spec:
- Portal 1: between `<QueEs />` and `<LaBolsa />`
- Portal 2: between `<LosNodos />` and `<Trayecto />`
- Portal 3: between the LogoLoop `<div>` and `<Contacto />`

- [ ] **Step 1: Add imports to App.jsx**

At the top of `src/App.jsx`, add after the existing imports:

```jsx
import Portal from './components/Portal'
import { portales } from './data/portales'
```

- [ ] **Step 2: Update the JSX in App.jsx**

Replace the `return` block with:

```jsx
  return (
    <>
      <Cursor />
      <Nav />
      <Hero />
      <QueEs />
      <Portal {...portales[0]} />
      <LaBolsa />
      <LosNodos />
      <Portal {...portales[1]} />
      <Trayecto />

      <div style={{ padding: '48px 0', borderBottom: '1px solid #0f0f0f' }}>
        <LogoLoop
          logos={instituciones}
          speed={22}
          direction="left"
          logoHeight={165}
          gap={40}
          hoverSpeed={0}
          scaleOnHover
          fadeOut
          fadeOutColor="#080808"
          ariaLabel="Instituciones del proyecto"
        />
      </div>

      <Portal {...portales[2]} />
      <Contacto />
      <Footer />
    </>
  )
```

- [ ] **Step 3: Verify build passes**

```bash
cd "/Users/cosita/Library/Mobile Documents/com~apple~CloudDocs/Documents/Academico/Tiempo en bolsa/landing-tiempo-en-bolsa"
npm run build 2>&1 | tail -20
```

Expected: `✓ built in` with no errors.

- [ ] **Step 4: Start dev server and verify visually**

```bash
cd "/Users/cosita/Library/Mobile Documents/com~apple~CloudDocs/Documents/Academico/Tiempo en bolsa/landing-tiempo-en-bolsa"
npm run dev
```

Open `http://localhost:5173` and check:
- Three portals appear at the correct positions
- Each portal fades/slides in on scroll (scroll reveal)
- Audio button shows "audio próximamente" and is visually dimmed (`opacity: 0.35`)
- On mobile viewport (resize to ≤768px): padding reduces, quote fills width
- Custom cursor switches to `interactive` state on button hover

- [ ] **Step 5: Commit**

```bash
git add src/App.jsx
git commit -m "feat: wire Portal instances into App layout"
```

---

### Acceptance Criteria Checklist

After Task 4 is done, verify against the spec:

- [ ] Los tres portales aparecen en las posiciones correctas
- [ ] El scroll reveal funciona (entran con fade + translateY)
- [ ] Sin `audioSrc`: botón desactivado, texto "audio próximamente"
- [ ] Con `audioSrc`: botón activo, primer click reproduce, segundo detiene (toggle play/stop)
- [ ] En mobile (≤768px): proporción y padding correctos, texto legible
- [ ] Build pasa sin errores o warnings
- [ ] El cursor personalizado reconoce el botón de audio como `interactive`

To test the audio active state without real clips, temporarily set `audioSrc` on one portal entry in `src/data/portales.js` to any `.mp3` URL, verify the button activates and toggles, then revert to `undefined`.
