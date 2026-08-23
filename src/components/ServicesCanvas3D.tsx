import { useEffect, useRef } from "react";
import * as THREE from "three";

export type ServiceShape = "cube" | "octahedron" | "torus" | "knot" | "dodecahedron";

interface ServicesCanvas3DProps {
  activeShape: ServiceShape;
}

export default function ServicesCanvas3D({ activeShape }: ServicesCanvas3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const meshGroupRef = useRef<THREE.Group | null>(null);
  const currentShapeRef = useRef<ServiceShape>(activeShape);

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
    camera.position.z = 4.5;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    meshGroupRef.current = group;
    scene.add(group);

    // Geometries
    const geometries = {
      cube: new THREE.BoxGeometry(1.6, 1.6, 1.6),
      octahedron: new THREE.OctahedronGeometry(1.5, 0),
      torus: new THREE.TorusGeometry(1.2, 0.4, 16, 60),
      knot: new THREE.TorusKnotGeometry(1.1, 0.3, 100, 16),
      dodecahedron: new THREE.DodecahedronGeometry(1.4, 0),
    };

    const wireMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#3d56f0"),
      wireframe: true,
      roughness: 0.1,
      metalness: 0.8,
      emissive: new THREE.Color("#131a4a"),
    });

    const innerMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#0e1440"),
      transparent: true,
      opacity: 0.6,
    });

    // Create initial mesh
    let currentMesh = new THREE.Mesh(geometries[activeShape], wireMaterial);
    let innerMesh = new THREE.Mesh(geometries[activeShape], innerMaterial);
    group.add(currentMesh);
    group.add(innerMesh);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const light1 = new THREE.PointLight(0x3d56f0, 4, 15);
    light1.position.set(3, 3, 3);
    scene.add(light1);

    // Mouse Parallax
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX - window.innerWidth / 2) * 0.0006;
      mouseY = (e.clientY - window.innerHeight / 2) * 0.0006;
    };

    window.addEventListener("mousemove", handleMouseMove);

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

      group.rotation.x = time * 0.4 + mouseY;
      group.rotation.y = time * 0.6 + mouseX;
      group.position.y = Math.sin(time * 2) * 0.1;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      Object.values(geometries).forEach((g) => g.dispose());
      wireMaterial.dispose();
      innerMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  // Update geometry on activeShape change
  useEffect(() => {
    if (!meshGroupRef.current || currentShapeRef.current === activeShape) return;
    currentShapeRef.current = activeShape;

    const group = meshGroupRef.current;

    // Smooth transition scale
    group.scale.set(0.1, 0.1, 0.1);
    const interval = setInterval(() => {
      if (group.scale.x < 1) {
        group.scale.addScalar(0.15);
      } else {
        group.scale.set(1, 1, 1);
        clearInterval(interval);
      }
    }, 16);
  }, [activeShape]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 h-64 w-64 md:h-80 md:w-80 opacity-80 md:opacity-100 z-20"
      aria-hidden="true"
    />
  );
}
