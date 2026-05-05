import { useEffect, useRef } from 'react'

const VERT = `
  attribute vec2 a_pos;
  void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`

const FRAG = `
  precision highp float;
  uniform vec2  u_res;
  uniform float u_time;
  uniform vec2  u_origin;
  uniform vec3  u_color;
  uniform float u_spread;
  uniform float u_rayLen;
  uniform float u_fadeDist;
  uniform vec2  u_mouse;
  uniform float u_mouseInfl;

  #define PI  3.14159265
  #define TAU 6.28318531
  #define N   16

  float h(float n) { return fract(sin(n * 127.1 + 311.7) * 43758.5453); }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_res;
    uv.y = 1.0 - uv.y;

    vec2 origin = u_origin + (u_mouse - u_origin) * u_mouseInfl;
    vec2 dir    = uv - origin;
    float dist  = length(dir);
    float angle = atan(dir.y, dir.x);

    float rays = 0.0;
    for (int i = 0; i < N; i++) {
      float fi    = float(i) / float(N);
      float base  = (fi * 2.0 - 1.0) * PI * u_spread;
      float drift = sin(u_time * 0.5 + fi * 7.3) * 0.06;
      float ra    = base + drift;
      /* ray width in radians — must be large enough to be visible */
      float w     = 0.08 + h(fi * 3.1 + 0.5) * 0.1;
      float br    = 0.6  + h(fi * 13.7 + 1.0) * 0.4;
      float d     = mod(angle - ra + PI, TAU) - PI;
      rays += br * exp(-(d * d) / (w * w));
    }
    rays = clamp(rays / float(N) * 2.5, 0.0, 1.0);

    /* distance from origin falloff */
    float distFall = pow(clamp(1.0 - dist / max(u_rayLen,   0.001), 0.0, 1.0), 1.0);
    /* outer fade */
    float fadeFall =     clamp(1.0 - dist / max(u_fadeDist, 0.001), 0.0, 1.0);

    float a = rays * distFall * fadeFall;
    gl_FragColor = vec4(u_color * a, a);
  }
`

const ORIGINS = {
  'top-center':    [0.5, 0.0],
  'top-left':      [0.0, 0.0],
  'top-right':     [1.0, 0.0],
  'center':        [0.5, 0.5],
  'bottom-center': [0.5, 1.0],
}

function hex2rgb(hex) {
  const c = hex.replace('#', '')
  return [
    parseInt(c.slice(0, 2), 16) / 255,
    parseInt(c.slice(2, 4), 16) / 255,
    parseInt(c.slice(4, 6), 16) / 255,
  ]
}

export default function LightRays({
  raysOrigin     = 'top-center',
  raysColor      = '#ffffff',
  raysSpeed      = 1,
  lightSpread    = 1,
  rayLength      = 1,
  followMouse    = false,
  mouseInfluence = 0.1,
  fadeDistance   = 1,
  className      = '',
  style          = {},
}) {
  const canvasRef = useRef(null)
  const mouseRef  = useRef([0.5, 0.5])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false })
    if (!gl) { console.warn('LightRays: WebGL not available'); return }

    const mkShader = (type, src) => {
      const s = gl.createShader(type)
      gl.shaderSource(s, src)
      gl.compileShader(s)
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS))
        console.error('LightRays shader error:', gl.getShaderInfoLog(s))
      return s
    }

    const prog = gl.createProgram()
    gl.attachShader(prog, mkShader(gl.VERTEX_SHADER,   VERT))
    gl.attachShader(prog, mkShader(gl.FRAGMENT_SHADER, FRAG))
    gl.linkProgram(prog)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS))
      console.error('LightRays link error:', gl.getProgramInfoLog(prog))
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW)
    const aPos = gl.getAttribLocation(prog, 'a_pos')
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    const U = n => gl.getUniformLocation(prog, n)
    const uRes = U('u_res'), uTime = U('u_time'), uOrigin = U('u_origin')
    const uColor = U('u_color'), uSpread = U('u_spread'), uRayLen = U('u_rayLen')
    const uFadeDist = U('u_fadeDist'), uMouse = U('u_mouse'), uMouseInfl = U('u_mouseInfl')

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const w = Math.round(rect.width)
      const h = Math.round(rect.height)
      if (w === 0 || h === 0) return
      canvas.width  = w
      canvas.height = h
      gl.viewport(0, 0, w, h)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const onMouse = e => {
      const r = canvas.getBoundingClientRect()
      mouseRef.current = [
        (e.clientX - r.left)  / r.width,
        1.0 - (e.clientY - r.top) / r.height,
      ]
    }
    if (followMouse) window.addEventListener('mousemove', onMouse)

    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

    const rgb    = hex2rgb(raysColor)
    const origin = ORIGINS[raysOrigin] ?? [0.5, 0.0]
    let start = null, raf

    const render = ts => {
      if (!start) start = ts
      const t = ((ts - start) / 1000) * raysSpeed
      if (canvas.width === 0 || canvas.height === 0) { raf = requestAnimationFrame(render); return }

      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.uniform2f(uRes,       canvas.width, canvas.height)
      gl.uniform1f(uTime,      t)
      gl.uniform2f(uOrigin,    origin[0], origin[1])
      gl.uniform3f(uColor,     rgb[0], rgb[1], rgb[2])
      gl.uniform1f(uSpread,    lightSpread)
      gl.uniform1f(uRayLen,    rayLength)
      gl.uniform1f(uFadeDist,  fadeDistance)
      gl.uniform2f(uMouse,     mouseRef.current[0], mouseRef.current[1])
      gl.uniform1f(uMouseInfl, followMouse ? mouseInfluence : 0)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      raf = requestAnimationFrame(render)
    }
    raf = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      if (followMouse) window.removeEventListener('mousemove', onMouse)
    }
  }, [raysOrigin, raysColor, raysSpeed, lightSpread, rayLength, followMouse, mouseInfluence, fadeDistance])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: '100%', height: '100%', display: 'block', ...style }}
    />
  )
}
