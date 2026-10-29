import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

export function createScene(container, { paused = false } = {}) {
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.7));
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  container.append(renderer.domElement);
  container.classList.add("scene-loaded");
  renderer.domElement.setAttribute("aria-hidden", "true");
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
  camera.position.set(5, 3.8, 7.2);
  camera.lookAt(0, 0, 0);
  scene.add(new THREE.AmbientLight(0xf7fae9, 2.3));
  const key = new THREE.DirectionalLight(0xffffff, 4);
  key.position.set(3, 6, 5);
  scene.add(key);
  const fill = new THREE.DirectionalLight(0xaab7cf, 2.7);
  fill.position.set(-5, 1, 2);
  scene.add(fill);
  const rim = new THREE.DirectionalLight(0xd5f86a, 2);
  rim.position.set(0, -2, -4);
  scene.add(rim);
  const sculpture = new THREE.Group();
  scene.add(sculpture);
  const dark = new THREE.MeshStandardMaterial({
    color: 0x303b31,
    metalness: 0.7,
    roughness: 0.27,
  });
  const light = new THREE.MeshStandardMaterial({
    color: 0xdce2ce,
    metalness: 0.35,
    roughness: 0.38,
  });
  const lime = new THREE.MeshStandardMaterial({
    color: 0xc8ec6c,
    metalness: 0.3,
    roughness: 0.3,
  });
  const blue = new THREE.MeshStandardMaterial({
    color: 0x6679b9,
    metalness: 0.45,
    roughness: 0.32,
  });
  const edgeMaterial = new THREE.LineBasicMaterial({
    color: 0x8b9877,
    transparent: true,
    opacity: 0.43,
  });
  const smallGeometry = new RoundedBoxGeometry(0.6, 0.6, 0.6, 3, 0.065);
  const mainGeometry = new RoundedBoxGeometry(1.35, 1.35, 1.35, 4, 0.15);
  const core = new THREE.Mesh(mainGeometry, dark);
  core.rotation.y = Math.PI / 4;
  sculpture.add(core);
  const cubeEdges = new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.BoxGeometry(1.37, 1.37, 1.37)),
    new THREE.LineBasicMaterial({
      color: 0xa0b58a,
      transparent: true,
      opacity: 0.36,
    }),
  );
  cubeEdges.rotation.y = Math.PI / 4;
  sculpture.add(cubeEdges);
  const modules = [];
  const positions = [
    [1.35, 0.8, 0.75],
    [-1.35, -0.75, -0.6],
    [-0.85, 1.2, 0.85],
    [0.85, -1.2, -0.85],
  ];
  positions.forEach((position, i) => {
    const module = new THREE.Mesh(smallGeometry, [lime, light, blue, lime][i]);
    module.position.set(...position);
    module.rotation.set(0.1, i * 0.4, 0.1);
    sculpture.add(module);
    modules.push(module);
    const curve = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(...position),
        new THREE.Vector3(0, 0, 0),
      ]),
      edgeMaterial,
    );
    sculpture.add(curve);
  });
  const rings = [];
  [1.75, 2.08].forEach((radius, i) => {
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(radius, 0.023, 8, 120),
      i === 0 ? light : dark,
    );
    ring.rotation.set(i === 0 ? 1.2 : 0.55, i === 0 ? 0.35 : 1.05, 0.2);
    sculpture.add(ring);
    rings.push(ring);
    const dot = new THREE.Mesh(new THREE.SphereGeometry(0.075, 16, 16), lime);
    dot.position.set(radius, 0, 0);
    ring.add(dot);
  });
  const cageGeometry = new THREE.IcosahedronGeometry(2.35, 0);
  const cage = new THREE.LineSegments(
    new THREE.EdgesGeometry(cageGeometry),
    new THREE.LineBasicMaterial({
      color: 0x899679,
      transparent: true,
      opacity: 0.19,
    }),
  );
  sculpture.add(cage);
  const particles = new THREE.Group();
  for (let i = 0; i < 12; i++) {
    const theta = i * 2.39996,
      y = Math.sin(i * 1.7) * 2;
    const dot = new THREE.Mesh(
      new THREE.SphereGeometry(i % 3 === 0 ? 0.035 : 0.018, 8, 8),
      i % 3 === 0 ? lime : light,
    );
    dot.position.set(Math.cos(theta) * 2.6, y, Math.sin(theta) * 2.6);
    particles.add(dot);
  }
  sculpture.add(particles);
  sculpture.rotation.set(-0.12, -0.3, -0.15);
  let pointerX = 0,
    pointerY = 0,
    rotationY = 0,
    rotationX = 0,
    dragging = false,
    lastX = 0,
    lastY = 0,
    visible = true,
    frame = 0,
    lastTime = 0,
    elapsed = 0;
  function resize() {
    const { width, height } = container.getBoundingClientRect();
    if (width < 1 || height < 1) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    render();
  }
  function render() {
    renderer.render(scene, camera);
  }
  function tick(time) {
    frame = 0;
    if (!visible || document.hidden || paused) return;
    const dt = lastTime ? Math.min((time - lastTime) / 1000, 0.04) : 0;
    lastTime = time;
    elapsed += dt;
    sculpture.rotation.y = rotationY + elapsed * 0.075 + pointerX * 0.09;
    sculpture.rotation.x = -0.12 + rotationX + pointerY * 0.06;
    sculpture.position.y = Math.sin(elapsed * 0.6) * 0.08;
    rings[0].rotation.z = 0.2 + elapsed * 0.045;
    rings[1].rotation.z = 0.2 - elapsed * 0.025;
    modules.forEach((m, i) => {
      m.rotation.y = elapsed * 0.1 + i * 0.4;
    });
    render();
    frame = requestAnimationFrame(tick);
  }
  function resume() {
    lastTime = 0;
    if (!frame && !paused && visible && !document.hidden)
      frame = requestAnimationFrame(tick);
  }
  function stop() {
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    lastTime = 0;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      visible = entries[0].isIntersecting;
      if (visible) resume();
      else stop();
    },
    { threshold: 0.01 },
  );
  observer.observe(container);
  new ResizeObserver(resize).observe(container);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stop();
    else resume();
  });
  container.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "mouse" || event.isPrimary) {
      dragging = true;
      lastX = event.clientX;
      lastY = event.clientY;
      container.classList.add("is-dragging");
      container.setPointerCapture(event.pointerId);
    }
  });
  container.addEventListener("pointermove", (event) => {
    const rect = container.getBoundingClientRect();
    pointerX = (event.clientX - rect.left) / rect.width - 0.5;
    pointerY = (event.clientY - rect.top) / rect.height - 0.5;
    if (dragging) {
      rotationY += (event.clientX - lastX) * 0.008;
      rotationX += (event.clientY - lastY) * 0.004;
      rotationX = Math.max(-0.7, Math.min(0.7, rotationX));
      lastX = event.clientX;
      lastY = event.clientY;
    }
    if (paused) {
      sculpture.rotation.y = rotationY;
      sculpture.rotation.x = -0.12 + rotationX;
      render();
    }
  });
  const release = () => {
    dragging = false;
    container.classList.remove("is-dragging");
    pointerX = 0;
    pointerY = 0;
  };
  container.addEventListener("pointerup", release);
  container.addEventListener("pointercancel", release);
  container.addEventListener("pointerleave", () => {
    if (!dragging) {
      pointerX = 0;
      pointerY = 0;
    }
  });
  renderer.domElement.addEventListener("webglcontextlost", () => {
    stop();
    container.classList.remove("scene-loaded");
  });
  resize();
  resume();
  return {
    setPaused(value) {
      paused = value;
      if (paused) {
        stop();
        render();
      } else resume();
    },
  };
}
