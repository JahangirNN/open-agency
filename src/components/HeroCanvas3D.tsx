import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroCanvas3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isMobile = window.innerWidth < 768;

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
      antialias: !isMobile,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 1.5));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // 3D Geometry: Kinetic Wireframe Torus Knot
    const geometry = isMobile
      ? new THREE.TorusKnotGeometry(1.3, 0.35, 60, 12)
      : new THREE.TorusKnotGeometry(1.3, 0.35, 120, 16);
    
    // Wireframe Material
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#3d56f0"),
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });

    // Translucent Inner Glass Material
    const innerMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#3d56f0"),
      transparent: true,
      opacity: 0.08,
      roughness: 0.1,
      metalness: 0.9,
    });

    const torusKnot = new THREE.Mesh(geometry, innerMaterial);
    const wireframeMesh = new THREE.Mesh(geometry, wireframeMaterial);
    wireframeMesh.scale.set(1.02, 1.02, 1.02);

    const group = new THREE.Group();
    group.add(torusKnot);
    group.add(wireframeMesh);
    
    group.position.x = isMobile ? 0.3 : 0.8;
    group.position.y = isMobile ? 0.6 : 0;
    scene.add(group);

    // Ambient 3D Particle Cloud
    const particleCount = isMobile ? 60 : 140;
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
      size: 0.03,
      transparent: true,
      opacity: 0.35,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x3d56f0, 4, 20);
    pointLight.position.set(4, 4, 4);
    scene.add(pointLight);

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

    if (!isMobile) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);

      const mobile = window.innerWidth < 768;
      group.position.x = mobile ? 0.3 : 0.8;
      group.position.y = mobile ? 0.6 : 0;
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop with Visibility Control (IntersectionObserver)
    let animationFrameId: number;
    let isVisible = true;
    const clock = new THREE.Clock();

    const animate = () => {
      if (!isVisible) return;

      const elapsedTime = clock.getElapsedTime();

      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      group.rotation.x = elapsedTime * 0.2 + targetY;
      group.rotation.y = elapsedTime * 0.3 + targetX;
      group.position.y = (window.innerWidth < 768 ? 0.6 : 0) + Math.sin(elapsedTime * 1.5) * 0.12;

      particles.rotation.y = -elapsedTime * 0.06;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    // Pause render loop when scrolled off-screen
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
          if (isVisible) {
            animate();
          } else {
            cancelAnimationFrame(animationFrameId);
          }
        });
      },
      { threshold: 0.05 }
    );

    observer.observe(container);
    animate();

    return () => {
      observer.disconnect();
      if (!isMobile) {
        window.removeEventListener("mousemove", handleMouseMove);
      }
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
      className="pointer-events-none absolute right-0 top-0 h-full w-full max-w-[750px] opacity-45 md:opacity-85 z-0"
      aria-hidden="true"
    />
  );
}
