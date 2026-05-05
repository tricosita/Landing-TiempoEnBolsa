# Tiempo en Bolsa — Decisiones de diseño

Laboratorio de Investigación Territorial  
Instituto Pellegrini · Pilar, Buenos Aires · Activo desde 2025

---

## Qué es este sitio

Landing page del proyecto Tiempo en Bolsa. Funciona simultáneamente como dispositivo de investigación, repositorio de archivo y generador de contenido. El sitio en sí es parte del ecosistema transmedia: no solo lo describe, lo encarna.

**Stack:** React + Vite · CSS Modules · desplegado en Vercel

---

## Concepto central: Polifonía Controlada

El proyecto tiene tres audiencias simultáneas con necesidades radicalmente distintas:

| Audiencia | Perfil | Necesita |
|-----------|--------|----------|
| **Umbral** | Estudiantes del predio, ~25 años | Dislocación perceptiva. Que lo invisible se vuelva visible. |
| **Instrumental** | Gobierno/gestión, ~40-50 años | Claridad operativa, metodología, datos, impacto visible. |
| **Par** | Artistas e investigadores de memoria regional | Posicionamiento conceptual, frameworks teóricos, diferenciación. |

La decisión de diseño central fue **no elegir una audiencia**: una sola landing que funciona como partitura con múltiples voces simultáneas. Cada público lee su nivel sin que los otros desaparezcan.

---

## Estructura de secciones

```
01 · HERO          — primera impresión, silencio, escala
02 · QUÉ ES        — definición en tres registros
03 · LA BOLSA      — el territorio con hover por eje
04 · LOS NODOS     — el ecosistema transmedia completo
05 · TRAYECTO      — timeline + galería de proceso
06 · CONTACTO      — tres voces de invitación
```

---

## Decisiones de UI

### Paleta de colores

| Variable | Valor | Uso |
|----------|-------|-----|
| `--bg` | `#080808` | Fondo base — negro casi puro |
| `--bg2` | `#0d0d0d` | Fondos de cards y bloques |
| `--gold` / `--territorio` | `#c8a96e` | Color principal · acento dorado envejecido |
| `--tech` | `#4ecdc4` | Eje tecnología — turquesa |
| `--arte` | `#ff6b9d` | Eje arte — rosa |
| `--text` | `#e8e0d0` | Texto base — marfil cálido |

**Por qué negro:** autoridad de expediente de investigación. El fondo oscuro sitúa al visitante en el rol de quien consulta un archivo, no de quien pasea por una institución.

**Por qué dorado:** evoca el latón de una placa, el desgaste de algo que duró. Coherente con un proyecto sobre memoria y tiempo.

**Por qué turquesa y rosa:** los ejes tecnología y arte necesitaban colores que convivan con el dorado sin competir. El turquesa remite a pantallas, circuitos, datos. El rosa a producción artística, cuerpo, afecto.

### Tipografía

**Space Mono** (Google Fonts) — monoespaciada, peso 400 y 700, con itálica.

**Por qué monoespaciada:** la tipografía de terminal o máquina de escribir conecta directamente con la idea de archivo, registro, documento técnico. No es ornamental: es funcional con carácter. Evita la genericidad de sans-serif limpias que no dicen nada sobre el proyecto.

**Jerarquía tipográfica:**
- Títulos de sección: `clamp(36px, 5vw, 60px)` · weight 700 · tracking `-2px`
- Cuerpo de ejes: `14px` · line-height `1.75` — deliberadamente generoso para lectura sostenida
- Labels y metadatos: `7-9px` · letter-spacing `3-5px` · uppercase — crean la gramática de archivo

### Capa fantasma (ghost text)

El hero tiene un texto de fondo con las palabras clave del proyecto (`MEMORIA TERRITORIO BOLSA TIEMPO PILAR...`) a `2.5%` de opacidad que sube a `5%` al hover. 

**Por qué:** tomado de la estética de palimpsesto — capas de escritura superpuestas. El visitante percibe que hay algo debajo de la superficie sin poder leerlo completamente. Es dislocación perceptiva para el Umbral, semántica evidente para el Par.

---

## Decisiones de UX

### Polifonía como tríada visual

Cada sección tiene tres bloques en grid `1fr 1fr 1fr` — uno por eje (Territorio, Tecnología, Arte o Umbral, Instrumental, Par). Las tres voces coexisten en el mismo espacio sin jerarquía visual: ninguna está arriba, ninguna es más grande.

**Diferenciación de voz:**
- Territorio/Umbral: texto en **itálica** — voz poética, sensorial
- Tecnología/Instrumental: texto **regular** — voz operativa, directa
- Arte/Par: texto en **uppercase con tracking** — voz conceptual, distanciada

### Hover en La Bolsa: reveal por eje

Al pasar el cursor sobre cada columna de la sección La Bolsa, el texto desaparece y emerge un placeholder de imagen. El color de fondo del reveal corresponde al eje: dorado para Territorio, turquesa para Tecnología, rosa para Arte.

**Por qué:** la imagen no está todo el tiempo visible porque no queremos que el sitio parezca un portfolio fotográfico antes de tener las imágenes. El hover convierte la curiosidad en descubrimiento. Cuando se agreguen las imágenes reales, el efecto persiste y enriquece.

### Cursor personalizado

Un punto dorado de 10px + un anillo de 32px que sigue al cursor con delay suave (interpolación `0.1` por frame). El anillo se expande a 56px y el cursor cambia de color al pasar por bloques interactivos:

- Zona Territorio → dorado
- Zona Tecnología → turquesa
- Zona Arte → rosa

**Por qué:** el cursor es el único elemento que acompaña al visitante en toda la experiencia. Convertirlo en un indicador del eje que se está recorriendo es polifonía también a nivel de interfaz.

### Hover en secciones

- **Título de sección:** al hover, el tracking comprimido pasa de `-2px` a `0px` y el color va de blanco a dorado. La letra se "relaja".
- **Bloques de tríada:** suben `6px` y el texto crece de `14px` a `15px` y aclara de `#666` a `#bbb`.
- **Timeline:** la fila se desplaza `16px` a la derecha con `padding-left` animado y el texto crece y aclara.
- **Cards de nodos:** suben `5px`, el título se ilumina a blanco, la descripción expande de `80px` a `300px` de max-height.

**Por qué:** cada interacción tiene que parecer que el contenido "respira" al ser tocado. Los estados hover no son decoración: son información sobre que algo puede ser leído más profundamente.

---

## Los Nodos Transmedia

El ecosistema completo tiene 7 nodos, cada uno con una función específica en el sistema:

| # | Nodo | Función transmedia |
|---|------|--------------------|
| 01 | **AudioTour con QR** | Puerta de entrada · conocimiento corporal · mayor alcance |
| 02 | **Web App Conexiones Inesperadas** | Motor de sentido · agencia máxima · construye el hilo |
| 03 | **Fanzine de Relatos y Postales** | Escala íntima · afecto · circulación autónoma |
| 04 | **ArtGame Retro** | Aprendizaje encubierto · lúdico · moraleja escondida |
| 05 | **Escala del Predio en VR** | Evidencia espacial · comparación con AudioTour |
| 06 | **Relatos para JAM** | Escala comunitaria · replicable · sin control del proyecto |
| 07 | **Exposición** | Cierre · el ecosistema visible como ecosistema |

La Exposición ocupa ancho completo en la grilla (`grid-column: 1 / -1`) porque es el único nodo que contiene a todos los demás.

---

## Placeholders de imagen

El sitio está diseñado para funcionar en dos estados:

**Estado actual (sin imágenes):** los placeholders son parte del diseño — bordes `dashed`, fondos casi negros, instrucciones claras. El sitio se ve terminado aunque vacío.

**Estado final (con imágenes):** reemplazar cada placeholder por `<img>` o `<video>`.

### Imágenes necesarias

| Sección | Cantidad | Formato recomendado | Descripción |
|---------|----------|--------------------|----|
| Hero | 1 | Horizontal, alta res | Vista del predio, luz rasante, espacio vacío. También acepta video mp4 muted autoplay |
| La Bolsa — Territorio | 1 | Vertical o cuadrado | Exterior del predio, luz natural |
| La Bolsa — Tecnología | 1 | Vertical o cuadrado | Captura de la web app o mapa digital |
| La Bolsa — Arte | 1 | Vertical o cuadrado | Fanzine, ArtGame, VR o intervención artística |
| Galería Trayecto | 6 | 4:3 o cuadrado | Trabajo de campo, proceso, entrevistas, comunidad |

---

## Deploy y flujo de trabajo

```
Código → GitHub (tricosita/Landing-TiempoEnBolsa) → Vercel (auto-deploy)
```

**URL de producción:** https://landing-tiempo-en-bolsa.vercel.app

Para deployar cambios:
```bash
cd "landing-tiempo-en-bolsa"
git add .
git commit -m "descripción del cambio"
git push
```

Vercel detecta el push y redeploya automáticamente en ~30 segundos.

---

## Para agregar imágenes

### Hero
En `src/components/Hero.jsx`, reemplazar el `<div className={styles.bg}>` por:
```jsx
<img src="/images/hero.jpg" alt="El predio" className={styles.bgImg} />
```
Y agregar en `Hero.module.css`:
```css
.bgImg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; filter: brightness(0.3); }
```

### La Bolsa
En `src/components/LaBolsa.jsx`, dentro de cada `.bolsa-img`, agregar:
```jsx
<img src="/images/territorio.jpg" alt="Territorio" style={{ width:'100%', height:'100%', objectFit:'cover', opacity:0.6 }} />
```

### Galería
En `src/components/Trayecto.jsx`, reemplazar el `<div className={styles.galeriaItem}>` por:
```jsx
<div className={styles.galeriaItem}>
  <img src={`/images/galeria-${g.num}.jpg`} alt={g.hint} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
</div>
```

Poner las imágenes en `public/images/`.

---

*Documento generado con Claude Code · Mayo 2025*
