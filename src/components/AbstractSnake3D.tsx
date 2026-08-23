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
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 85;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // 🐍 3D Snake Assembly Group
    const snakeGroup = new THREE.Group();
    scene.add(snakeGroup);

    // Materials
    const skinMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#18224b"),
      roughness: 0.25,
      metalness: 0.75,
      wireframe: false,
    });

    const scaleRingMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#3d56f0"),
      roughness: 0.1,
      metalness: 0.9,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });

    const fangMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#ffffff"),
      roughness: 0.05,
      metalness: 0.2,
      emissive: new THREE.Color("#d0d8ff"),
      emissiveIntensity: 0.3,
    });

    const eyeMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#ff2a5f"),
      emissive: new THREE.Color("#ff003b"),
      emissiveIntensity: 0.9,
      roughness: 0.1,
    });

    const tongueMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#ff1a40"),
    });

    // 1. VIPER HEAD CONTAINER
    const headGroup = new THREE.Group();

    // Viper Skull (Wedge Snout)
    const skullGeometry = new THREE.ConeGeometry(2.4, 4.5, 5);
    skullGeometry.rotateX(Math.PI / 2);
    skullGeometry.scale(1.2, 0.6, 1.4);
    const skull = new THREE.Mesh(skullGeometry, skinMaterial);
    headGroup.add(skull);

    // Viper Brow / Ridge
    const browGeometry = new THREE.BoxGeometry(2.6, 0.6, 2.2);
    const brow = new THREE.Mesh(browGeometry, skinMaterial);
    brow.position.set(0, 0.4, -0.3);
    headGroup.add(brow);

    // Left & Right Fangs
    const fangGeometry = new THREE.ConeGeometry(0.18, 1.1, 8);
    fangGeometry.rotateX(-Math.PI / 6);

    const leftFang = new THREE.Mesh(fangGeometry, fangMaterial);
    leftFang.position.set(-0.65, -0.6, 1.2);
    headGroup.add(leftFang);

    const rightFang = new THREE.Mesh(fangGeometry, fangMaterial);
    rightFang.position.set(0.65, -0.6, 1.2);
    headGroup.add(rightFang);

    // Glowing Eyes
    const eyeGeometry = new THREE.SphereGeometry(0.25, 12, 12);
    eyeGeometry.scale(1.2, 0.8, 1.4);

    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-1.05, 0.3, 0.2);
    headGroup.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(1.05, 0.3, 0.2);
    headGroup.add(rightEye);

    // Forked Tongue
    const tongueGroup = new THREE.Group();
    const tongueStem = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 1.2), tongueMaterial);
    tongueStem.rotateX(Math.PI / 2);
    tongueStem.position.z = 1.8;
    tongueGroup.add(tongueStem);

    const forkLeft = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.02, 0.5), tongueMaterial);
    forkLeft.position.set(-0.12, 0, 2.4);
    forkLeft.rotateZ(-Math.PI / 6);
    forkLeft.rotateX(Math.PI / 2);
    tongueGroup.add(forkLeft);

    const forkRight = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.02, 0.5), tongueMaterial);
    forkRight.position.set(0.12, 0, 2.4);
    forkRight.rotateZ(Math.PI / 6);
    forkRight.rotateX(Math.PI / 2);
    tongueGroup.add(forkRight);

    tongueGroup.position.set(0, -0.35, 0.4);
    headGroup.add(tongueGroup);

    snakeGroup.add(headGroup);

    // Head Light
    const headLight = new THREE.PointLight(0x3d56f0, 4, 30);
    headLight.position.set(0, 1, 2);
    headGroup.add(headLight);

    // 2. SNAKE BODY SEGMENTS (Tapering Scale Rings)
    const SEGMENT_COUNT = 55;
    const bodySegments: THREE.Group[] = [];

    const bodySegmentGeo = new THREE.CylinderGeometry(1.6, 1.6, 0.7, 14);
    bodySegmentGeo.rotateX(Math.PI / 2);

    for (let i = 0; i < SEGMENT_COUNT; i++) {
      const segGroup = new THREE.Group();

      const mainMesh = new THREE.Mesh(bodySegmentGeo, skinMaterial);
      const wireRing = new THREE.Mesh(bodySegmentGeo, scaleRingMaterial);
      wireRing.scale.set(1.04, 1.04, 1.04);

      segGroup.add(mainMesh);
      segGroup.add(wireRing);

      // Taper down toward tail
      const taper = Math.max(0.15, 1 - Math.pow(i / SEGMENT_COUNT, 1.2) * 0.85);
      segGroup.scale.set(taper, taper, taper);

      snakeGroup.add(segGroup);
      bodySegments.push(segGroup);
    }

    // Ambient & Directional Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x3d56f0, 2);
    dirLight.position.set(20, 40, 30);
    scene.add(dirLight);

    // Trackers
    let scrollY = window.scrollY;
    let targetScrollY = window.scrollY;

    const handleScroll = () => {
      targetScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);

    // Resize Handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Trail of past head positions for smooth organic slithering
    const historyLength = SEGMENT_COUNT * 3;
    const history: THREE.Vector3[] = [];
    for (let i = 0; i < historyLength; i++) {
      history.push(new THREE.Vector3(0, 0, 0));
    }

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      scrollY += (targetScrollY - scrollY) * 0.04;

      // 🔴 SLOW, HYPNOTIC SLITHER MOTION
      const slowTime = elapsedTime * 0.45; // 70% slower speed
      const scrollFactor = scrollY * 0.0015;
      const t = slowTime + scrollFactor;

      // Organic serpentine path across viewport
      const headX = Math.sin(t * 1.1) * 38 + Math.cos(t * 0.6) * 18;
      const headY = Math.cos(t * 0.8) * 28 + Math.sin(t * 1.4) * 14 - (scrollY % (window.innerHeight * 1.5)) * 0.035;
      const headZ = Math.sin(t * 0.9) * 20;

      const currentHeadPos = new THREE.Vector3(headX, headY, headZ);
      headGroup.position.copy(currentHeadPos);

      // Orient Snake Head along movement vector
      const nextPos = new THREE.Vector3(
        Math.sin((t + 0.05) * 1.1) * 38 + Math.cos((t + 0.05) * 0.6) * 18,
        Math.cos((t + 0.05) * 0.8) * 28 + Math.sin((t + 0.05) * 1.4) * 14 - (scrollY % (window.innerHeight * 1.5)) * 0.035,
        Math.sin((t + 0.05) * 0.9) * 20
      );
      headGroup.lookAt(nextPos);

      // Flickering Tongue Animation
      const tongueFlick = Math.sin(elapsedTime * 6);
      tongueGroup.position.z = tongueFlick > 0.4 ? 0.8 + tongueFlick * 0.3 : 0.4;

      // Update History Trail
      history.unshift(currentHeadPos.clone());
      if (history.length > historyLength) {
        history.pop();
      }

      // Update Body Segments to follow smooth trail with S-curve undulation
      bodySegments.forEach((seg, i) => {
        const historyIdx = Math.min((i + 1) * 2, history.length - 1);
        const trailPos = history[historyIdx];

        // Serpentine S-Curve Side-Wave
        const wave = Math.sin(slowTime * 3 - i * 0.2) * 1.2;
        seg.position.set(
          trailPos.x + wave * 0.4,
          trailPos.y,
          trailPos.z
        );

        // Look at next segment
        const prevIdx = Math.max(0, historyIdx - 1);
        seg.lookAt(history[prevIdx]);
      });

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      skullGeometry.dispose();
      browGeometry.dispose();
      fangGeometry.dispose();
      eyeGeometry.dispose();
      bodySegmentGeo.dispose();
      skinMaterial.dispose();
      scaleRingMaterial.dispose();
      fangMaterial.dispose();
      eyeMaterial.dispose();
      tongueMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-10 opacity-75 md:opacity-90"
      aria-hidden="true"
    />
  );
}
