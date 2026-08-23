import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroCanvas3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // 3D Geometry: Kinetic Wireframe Torus Knot
    const geometry = new THREE.TorusKnotGeometry(1.4, 0.4, 120, 16);
    
    // Custom Material with Subtle Accent Blue Glow
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#3d56f0"),
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });

    const innerMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#0e1440"),
      roughness: 0.2,
      metalness: 0.8,
    });

    const torusKnot = new THREE.Mesh(geometry, innerMaterial);
    const wireframeMesh = new THREE.Mesh(geometry, wireframeMaterial);
    wireframeMesh.scale.set(1.02, 1.02, 1.02);

    const group = new THREE.Group();
    group.add(torusKnot);
    group.add(wireframeMesh);
    group.position.x = 0.8;
    scene.add(group);

    // Ambient 3D Particle Cloud
    const particleCount = 180;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 12;
      positions[i + 1] = (Math.random() - 0.5) * 12;
      positions[i + 2] = (Math.random() - 0.5) * 12;
    }

    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    const particleMaterial = new THREE.PointsMaterial({
      color: new THREE.Color("#3d56f0"),
      size: 0.035,
      transparent: true,
      opacity: 0.4,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x3d56f0, 3, 20);
    pointLight.position.set(4, 4, 4);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0xffffff, 1.5, 20);
    pointLight2.position.set(-4, -4, -2);
    scene.add(pointLight2);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;
      mouseX = (e.clientX - windowHalfX) * 0.0008;
      mouseY = (e.clientY - windowHalfY) * 0.0008;
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
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      // Rotation & Floating
      group.rotation.x = elapsedTime * 0.25 + targetY;
      group.rotation.y = elapsedTime * 0.35 + targetX;
      group.position.y = Math.sin(elapsedTime * 1.5) * 0.15;

      particles.rotation.y = -elapsedTime * 0.08;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      particleGeometry.dispose();
      wireframeMaterial.dispose();
      innerMaterial.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute right-0 top-0 h-full w-full max-w-[750px] opacity-70 md:opacity-90 z-0"
      aria-hidden="true"
    />
  );
}
