# Portales de Archivo — Diseño

**Proyecto:** Tiempo en Bolsa · Landing  
**Fecha:** Mayo 2026  
**Estado:** Aprobado

---

## Qué se construye

Un componente `Portal` que aparece entre secciones de la landing. Cada portal muestra un fragmento de testimonio real del archivo del proyecto + un botón de audio que arranca desactivado y se activa cuando existan los clips grabados.

Tres instancias en la página, con cadencia regular (un portal por cada tercio de la página).

---

## Por qué

La landing describe el proyecto pero no lo encarna todavía. Los testimonios existen como texto en el archivo — hacer que aparezcan en la página convierte la landing en un dispositivo de investigación activo, coherente con el concepto de "polifonía controlada". El scroll deja de ser lineal y se convierte en un recorrido con interrupciones narrativas.

---

## Arquitectura

### Archivos nuevos

| Archivo | Rol |
|---------|-----|
| `src/components/Portal.jsx` | Componente presentacional |
| `src/components/Portal.module.css` | Estilos del portal |
| `src/data/portales.js` | Datos de los tres portales |

### Archivos modificados

| Archivo | Cambio |
|---------|--------|
| `src/App.jsx` | Tres instancias de `<Portal>` entre las secciones correctas |

---

## Componente Portal

### Props

```jsx
<Portal
  quote="texto del testimonio"
  author="Nombre Apellido · testimonio 2026"
  audioSrc={undefined}        // string | undefined — activa el botón de audio
  audioDuration={undefined}   // string | undefined — ej: "0:22"
/>
```

`audioSrc` y `audioDuration` son opcionales. Si no se pasan, el botón de audio se renderiza en estado desactivado.

### Comportamiento

- Aparece en el flujo del DOM como cualquier sección (no overlay, no fixed)
- El scroll reveal usa el mismo patrón que `.seccion`: arranca con `opacity: 0` + `translateY(20px)`, el `IntersectionObserver` de `App.jsx` añade la clase `.revealed`
- Para eso el portal tiene `className="seccion"` más su clase de módulo propia
- Audio: si `audioSrc` está presente, el botón reproduce el clip. Si no, el botón está desactivado visualmente (`opacity: 0.35`, `cursor: not-allowed`)

---

## Diseño visual

### Contenedor

```css
min-height: 40vh
background: #050505          /* más oscuro que --bg (#080808), contraste sutil */
display: flex / column / center / center
padding: 56px 48px
text-align: center
border-top/bottom: 1px solid rgba(200,169,110,.06)
```

Líneas decorativas en top y bottom con `::before` / `::after`:
```css
left: 80px; right: 80px; height: 1px;
background: linear-gradient(to right, transparent, rgba(200,169,110,.12), transparent)
```

### Tipografía

| Elemento | Estilo |
|----------|--------|
| Eyebrow `· fragmento de archivo ·` | 7px · tracking 5px · uppercase · gold al 20% |
| Cita | `clamp(14px, 1.6vw, 18px)` · italic · `#5a5750` · line-height 1.85 · max-width 520px |
| Separador | 32px × 1px · `rgba(200,169,110,.18)` |
| Autor | 7px · tracking 4px · uppercase · `#2a2a22` |

### Botón de audio

```
[ ▶ ]  escuchar testimonio
       0:14 · audio original
```

- Borde `1px solid rgba(200,169,110,.15)`
- Hover: border más visible + fondo `rgba(200,169,110,.04)`
- Estado inactive: `opacity: 0.35`, `cursor: not-allowed`, texto "audio próximamente"

### Responsive

En `max-width: 768px`:
- `padding: 48px 24px`
- líneas decorativas `left: 24px; right: 24px`
- cita `max-width: 100%`

---

## Datos — `src/data/portales.js`

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

Cuando existan los clips, agregar `audioSrc: '/audio/morales-01.mp3'` en el objeto correspondiente. Sin tocar el componente.

---

## Placement en App.jsx

```
<Hero />
<QueEs />
<Portal ...portales[0] />      ← entre QUÉ ES y LA BOLSA
<LaBolsa />
<LosNodos />
<Portal ...portales[1] />      ← entre LOS NODOS y TRAYECTO
<Trayecto />
<LogoLoop />
<Portal ...portales[2] />      ← entre LOGOS y CONTACTO
<Contacto />
<Footer />
```

---

## Scroll reveal

El `IntersectionObserver` en `App.jsx` ya observa todos los elementos con clase `seccion`. El portal usa esa clase, por lo que entra en el sistema automáticamente sin cambios en `App.jsx`.

---

## Criterios de aceptación

- [ ] Los tres portales aparecen en las posiciones correctas
- [ ] El scroll reveal funciona (entran con fade + translateY)
- [ ] Sin `audioSrc`: botón desactivado, texto "audio próximamente"
- [ ] Con `audioSrc`: botón activo, primer click reproduce, segundo detiene (toggle play/stop)
- [ ] En mobile (≤768px): proporción y padding correctos, texto legible
- [ ] Build pasa sin errores o warnings
- [ ] El cursor personalizado reconoce el botón de audio como `interactive`

---

## Lo que esto no incluye

- Grabación o edición de los clips de audio (tarea de producción, no de código)
- Player con barra de progreso (el botón play/stop es suficiente para esta versión)
- Portal animado al hover de la cita (se puede agregar en v2)
