import React, { useEffect, useRef } from 'react';

interface ShaderCanvasProps {
  isDarkMode: boolean;
}

export const ShaderCanvas: React.FC<ShaderCanvasProps> = ({ isDarkMode }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;
    if (!gl) return;

    let animationFrameId: number;

    const vs = `
      attribute vec2 a_position;
      varying vec2 v_texCoord;
      void main() {
        v_texCoord = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fs = `
      precision highp float;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      uniform float u_dark;

      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
                   mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        vec2 p = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);

        float t = u_time * 0.14;
        float n1 = noise(p * 2.2 + vec2(t * 0.5, -t * 0.3));
        float n2 = noise(p * 4.0 - vec2(-t * 0.2, t * 0.4));
        float n = n1 * 0.7 + n2 * 0.3;

        float dist = length(p - vec2(0.0, 0.2));
        float glow = smoothstep(1.3, 0.1, dist);

        vec2 mouseNorm = (u_mouse / u_resolution) - 0.5;
        float mouseDist = length(p - vec2(mouseNorm.x, -mouseNorm.y));
        float mouseGlow = smoothstep(0.7, 0.0, mouseDist) * 0.35;

        // Dark vs Light palette blend
        vec3 deepBlack = mix(vec3(0.94, 0.96, 0.98), vec3(0.035, 0.039, 0.051), u_dark);
        vec3 deepNavy = mix(vec3(0.88, 0.92, 0.97), vec3(0.045, 0.065, 0.11), u_dark);
        vec3 electricCyan = vec3(0.0, 0.94, 1.0);
        vec3 royalBlue = vec3(0.14, 0.45, 0.95);

        vec3 col = mix(deepBlack, deepNavy, glow * 0.85);
        col += electricCyan * pow(n, 3.2) * (glow * 0.45 + mouseGlow * 0.75);
        col += royalBlue * pow(n1, 2.5) * glow * 0.25;

        float scanline = clamp(sin(uv.y * u_resolution.y * 1.5) * 0.015, -0.01, 0.01);
        col += vec3(scanline);

        gl_FragColor = vec4(col, u_dark > 0.5 ? 0.35 : 0.18);
      }
    `;

    function compileShader(type: number, source: string) {
      const shader = gl!.createShader(type);
      if (!shader) return null;
      gl!.shaderSource(shader, source);
      gl!.compileShader(shader);
      return shader;
    }

    const vertexShader = compileShader(gl.VERTEX_SHADER, vs);
    const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fs);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );

    const positionLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(program, 'u_time');
    const uRes = gl.getUniformLocation(program, 'u_resolution');
    const uMouse = gl.getUniformLocation(program, 'u_mouse');
    const uDark = gl.getUniformLocation(program, 'u_dark');

    let mouse = { x: canvas.width / 2, y: canvas.height / 2 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width && rect.height) {
        const nx = (e.clientX - rect.left) / rect.width;
        const ny = 1.0 - (e.clientY - rect.top) / rect.height;
        mouse.x = nx * canvas.width;
        mouse.y = ny * canvas.height;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    const syncSize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    };

    syncSize();
    window.addEventListener('resize', syncSize);

    const render = (time: number) => {
      gl.viewport(0, 0, canvas.width, canvas.height);
      if (uTime) gl.uniform1f(uTime, time * 0.001);
      if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
      if (uMouse) gl.uniform2f(uMouse, mouse.x, mouse.y);
      if (uDark) gl.uniform1f(uDark, isDarkMode ? 1.0 : 0.0);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', syncSize);
    };
  }, [isDarkMode]);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden transition-opacity duration-700">
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};
