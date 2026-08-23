import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function AbstractSnake3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 100;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // 🐍 Snake Chain Configuration
    const SEGMENT_COUNT = 45;
    const segments: THREE.Mesh[] = [];
    const snakeGroup = new THREE.Group();
    scene.add(snakeGroup);

    // Geometries & Materials
    const headGeometry = new THREE.IcosahedronGeometry(2.2, 1);
    const bodyGeometry = new THREE.OctahedronGeometry(1.4, 0);

    const headMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#3d56f0"),
      wireframe: true,
      roughness: 0.1,
      metalness: 0.9,
      emissive: new THREE.Color("#1e2980"),
    });

    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#3d56f0"),
      wireframe: true,
      transparent: true,
      opacity: 0.7,
      roughness: 0.2,
      metalness: 0.8,
    });

    // Create Head & Body Segments
    for (let i = 0; i < SEGMENT_COUNT; i++) {
      const isHead = i === 0;
      const mesh = new THREE.Mesh(
        isHead ? headGeometry : bodyGeometry,
        isHead ? headMaterial : bodyMaterial
      );
      
      // Scale down along tail
      const scale = isHead ? 1.2 : Math.max(0.3, 1 - (i / SEGMENT_COUNT) * 0.75);
      mesh.scale.set(scale, scale, scale);
      
      snakeGroup.add(mesh);
      segments.push(mesh);
    }

    // Glowing Light on Snake Head
    const headLight = new THREE.PointLight(0x3d56f0, 6, 40);
    snakeGroup.add(headLight);

    // 💥 Devour Particle Burst System
    const particleCount = 120;
    const burstGeometry = new THREE.BufferGeometry();
    const burstPositions = new Float32Array(particleCount * 3);
    const burstVelocities: THREE.Vector3[] = [];

    for (let i = 0; i < particleCount; i++) {
      burstPositions[i * 3] = 0;
      burstPositions[i * 3 + 1] = 0;
      burstPositions[i * 3 + 2] = 0;

      const dir = new THREE.Vector3(
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2
      ).normalize().multiplyScalar(Math.random() * 1.5 + 0.5);

      burstVelocities.push(dir);
    }

    burstGeometry.setAttribute("position", new THREE.BufferAttribute(burstPositions, 3));

    const burstMaterial = new THREE.PointsMaterial({
      color: new THREE.Color("#3d56f0"),
      size: 1.8,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const burstParticles = new THREE.Points(burstGeometry, burstMaterial);
    scene.add(burstParticles);

    // Ambient Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    // Trackers
    let scrollY = window.scrollY;
    let targetScrollY = window.scrollY;
    let mouseX = 0;
    let mouseY = 0;

    const handleScroll = () => {
      targetScrollY = window.scrollY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX - window.innerWidth / 2) * 0.05;
      mouseY = (e.clientY - window.innerHeight / 2) * 0.05;
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // History of Head Positions for Inverse Kinematics / Follow Trail
    const positionTrail: THREE.Vector3[] = [];
    for (let i = 0; i < SEGMENT_COUNT * 4; i++) {
      positionTrail.push(new THREE.Vector3(0, 0, 0));
    }

    // Devour Trigger Logic
    let lastSectionTrigger = 0;
    let burstActive = false;
    let burstTime = 0;

    const triggerDevourBurst = (headPos: THREE.Vector3) => {
      burstParticles.position.copy(headPos);
      const posArr = burstGeometry.attributes.position.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        posArr[i * 3] = 0;
        posArr[i * 3 + 1] = 0;
        posArr[i * 3 + 2] = 0;
      }
      burstGeometry.attributes.position.needsUpdate = true;
      burstActive = true;
      burstTime = 0;
    };

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      scrollY += (targetScrollY - scrollY) * 0.08;

      // Calculate Wild 3D Lissajous Path for Head
      const scrollFactor = scrollY * 0.003;
      const t = elapsedTime * 1.2 + scrollFactor;

      const headX = Math.sin(t * 1.3) * 60 + Math.cos(t * 2.1) * 35 + mouseX;
      const headY = Math.cos(t * 0.9) * 45 + Math.sin(t * 1.7) * 30 - (scrollY % (window.innerHeight * 2)) * 0.04 + mouseY;
      const headZ = Math.sin(t * 1.1) * 35 + Math.cos(t * 0.7) * 20;

      const headPos = new THREE.Vector3(headX, headY, headZ);
      headLight.position.copy(headPos);

      // Update Position Trail
      positionTrail.unshift(headPos.clone());
      if (positionTrail.length > SEGMENT_COUNT * 4) {
        positionTrail.pop();
      }

      // Update Segments
      segments.forEach((seg, idx) => {
        const trailIndex = idx * 3;
        const targetPos = positionTrail[Math.min(trailIndex, positionTrail.length - 1)];
        seg.position.copy(targetPos);
        
        // Rotate segment dynamically
        seg.rotation.x = t + idx * 0.15;
        seg.rotation.y = t * 1.2 + idx * 0.1;
      });

      // Check section milestones to trigger Devour Burst
      const currentSection = Math.floor(scrollY / 600);
      if (currentSection !== lastSectionTrigger && Math.abs(currentSection - lastSectionTrigger) >= 1) {
        lastSectionTrigger = currentSection;
        triggerDevourBurst(headPos);
      }

      // Animate Devour Particles
      if (burstActive) {
        burstTime += 0.03;
        const posArr = burstGeometry.attributes.position.array as Float32Array;

        for (let i = 0; i < particleCount; i++) {
          posArr[i * 3] += burstVelocities[i].x * 1.2;
          posArr[i * 3 + 1] += burstVelocities[i].y * 1.2;
          posArr[i * 3 + 2] += burstVelocities[i].z * 1.2;
        }

        burstGeometry.attributes.position.needsUpdate = true;
        burstMaterial.opacity = Math.max(0, 0.8 - burstTime * 0.8);

        if (burstTime > 1) {
          burstActive = false;
        }
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      headGeometry.dispose();
      bodyGeometry.dispose();
      headMaterial.dispose();
      bodyMaterial.dispose();
      burstGeometry.dispose();
      burstMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-10 opacity-70 md:opacity-90"
      aria-hidden="true"
    />
  );
}
