import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ManifestoCanvas3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isMobile = window.innerWidth < 768;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 1.5));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // 3D Geometry: Detailed Wireframe Icosahedron
    const geometry = isMobile
      ? new THREE.IcosahedronGeometry(1.6, 1)
      : new THREE.IcosahedronGeometry(1.6, 2);

    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#3d56f0"),
      wireframe: true,
      roughness: 0.1,
      metalness: 0.9,
      emissive: new THREE.Color("#1a2675"),
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const light = new THREE.PointLight(0x3d56f0, 4, 15);
    light.position.set(3, 3, 3);
    scene.add(light);

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop with IntersectionObserver pausing
    let animationFrameId: number;
    let isVisible = false;
    const clock = new THREE.Clock();

    const animate = () => {
      if (!isVisible) return;

      const time = clock.getElapsedTime();

      mesh.rotation.x = time * 0.2;
      mesh.rotation.y = time * 0.3;
      mesh.position.y = Math.sin(time * 1.2) * 0.1;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

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

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute -right-10 -bottom-10 h-72 w-72 md:h-96 md:w-96 opacity-40 md:opacity-65 z-0"
      aria-hidden="true"
    />
  );
}
