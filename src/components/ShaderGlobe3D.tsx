import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const vertexShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;

  // Simplex Noise Function
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);

    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;

    i = mod289(i);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));

    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);

    vec4 x = x_ *ns.x + vec4(ns.yyyy);
    vec4 y = y_ *ns.x + vec4(ns.yyyy);
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);

    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;

    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    vUv = uv;
    vNormal = normal;
    vPosition = position;

    // Liquid surface distortion calculation
    float noise = snoise(position * 1.5 + vec3(uTime * 0.4)) * 0.25;
    float distToMouse = distance(uv, uMouse);
    float mouseDisplacement = sin(distToMouse * 10.0 - uTime * 3.0) * 0.1;

    vec3 newPosition = position + normal * (noise + mouseDisplacement);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  varying vec2 vUv;
  varying vec3 vNormal;

  void main() {
    // Fresnel Rim Glow
    vec3 viewDirection = normalize(-vNormal);
    float fresnel = pow(1.0 - max(dot(viewDirection, vec3(0.0, 0.0, 1.0)), 0.0), 2.5);

    vec3 color = mix(uColorA, uColorB, vUv.y + sin(uTime * 0.5) * 0.2);
    color += fresnel * vec3(0.4, 0.6, 1.0);

    gl_FragColor = vec4(color, 0.95);
  }
`;

const PRESETS = {
  indigo: { colorA: "#0e1440", colorB: "#3d56f0", name: "Liquid Indigo" },
  pearl: { colorA: "#2a1b4e", colorB: "#ff70a6", name: "Holographic Pearl" },
  cyber: { colorA: "#051923", colorB: "#00a896", name: "Cyber Wave" },
};

export default function ShaderGlobe3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [presetKey, setPresetKey] = useState<keyof typeof PRESETS>("indigo");

  const materialRef = useRef<THREE.ShaderMaterial | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.z = 5.5;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // 3D Sphere Geometry
    const geometry = new THREE.SphereGeometry(1.6, 64, 64);

    const activePreset = PRESETS[presetKey];
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uColorA: { value: new THREE.Color(activePreset.colorA) },
        uColorB: { value: new THREE.Color(activePreset.colorB) },
      },
      transparent: true,
      wireframe: false,
    });
    materialRef.current = material;

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Wireframe Outer Mesh
    const wireMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#3d56f0"),
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const wireMesh = new THREE.Mesh(geometry, wireMaterial);
    wireMesh.scale.set(1.05, 1.05, 1.05);
    scene.add(wireMesh);

    // Mouse Interaction
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      material.uniforms.uMouse.value.set(x, y);
    };

    container.addEventListener("mousemove", handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const time = clock.getElapsedTime();
      material.uniforms.uTime.value = time;

      mesh.rotation.y = time * 0.15;
      wireMesh.rotation.y = -time * 0.1;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      wireMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  // Handle Preset Changes
  useEffect(() => {
    if (materialRef.current) {
      const preset = PRESETS[presetKey];
      materialRef.current.uniforms.uColorA.value.set(preset.colorA);
      materialRef.current.uniforms.uColorB.value.set(preset.colorB);
    }
  }, [presetKey]);

  return (
    <div className="relative my-12 rounded-3xl border border-ink/10 bg-ink p-8 md:p-14 text-paper overflow-hidden">
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-xl">
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-accent">
            ✦ WebGL Shader Lab — Interactive
          </span>
          <h3 className="mt-3 text-3xl md:text-5xl font-medium tracking-tight">
            Dynamic Liquid <span className="font-serif italic text-accent">Shader.</span>
          </h3>
          <p className="mt-4 text-sm text-paper/70 leading-relaxed">
            Move your cursor over the 3D surface to trigger real-time GLSL vertex displacement waves & Fresnel lighting reflections.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {(Object.keys(PRESETS) as (keyof typeof PRESETS)[]).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setPresetKey(key)}
                className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                  presetKey === key
                    ? "bg-accent text-paper shadow-md"
                    : "border border-paper/20 bg-paper/5 text-paper/70 hover:border-paper/40 hover:text-paper"
                }`}
              >
                {PRESETS[key].name}
              </button>
            ))}
          </div>
        </div>

        {/* 3D WebGL Canvas Container */}
        <div
          ref={containerRef}
          className="h-72 w-72 md:h-96 md:w-96 relative flex items-center justify-center cursor-pointer"
        />
      </div>
    </div>
  );
}
