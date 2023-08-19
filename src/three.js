import * as THREE from "three";
import * as lil from "lil-gui";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

THREE.ColorManagement.enabled = false;

const canvas = document.querySelector(".webgl");
const gui = new lil.GUI();
gui.hide();
const textureLoader = new THREE.TextureLoader();
const toonMaterialTexture = textureLoader.load("/textures/gradients/3.jpg");
const moonMapTexture = textureLoader.load("/textures/lroc_color_poles_1k.jpg");
toonMaterialTexture.magFilter = THREE.NearestFilter;
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const scene = new THREE.Scene();

/**
 * Particles
 */
const particlesGeometry = new THREE.BufferGeometry();
const particlesMaterial = new THREE.PointsMaterial({
  size: 0.02,
  color: 0xccccff,
});
const particles = new THREE.Points(particlesGeometry, particlesMaterial);
particles.position.set(5, -10, 0);
scene.add(particles);
const count = 5000;
const positions = new Float32Array(count * 3);
for (let index = 0; index < count * 3; index++) {
  const i3 = index * 3;
  positions[i3] = (Math.random() - 0.5) * 100;
  positions[i3 + 1] = (Math.random() - 0.5) * 100;
  positions[i3 + 2] = (Math.random() - 0.5) * 100;
}
const count2 = 5000;
const positions2 = new Float32Array(count2 * 3);
for (let index = 0; index < count2 * 3; index++) {
  const i3 = index * 3;
  positions2[i3] = (Math.random() - 0.5) * 100;
  positions2[i3 + 1] = (Math.random() - 0.5) * 100;
  positions2[i3 + 2] = (Math.random() - 0.5) * 100;
}
particlesGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(positions, 3)
);

const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const sphereMaterial = new THREE.PointsMaterial({
  size: 0.04,
  color: 0xffccff,
});
const sphere = new THREE.Points(sphereGeometry, sphereMaterial);
sphere.position.set(0, 0, -3);
sphereGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(positions2, 3)
);
scene.add(sphere);
const objectsDistance = 6;

/**
 * Objects
 */
const torusGeometry = new THREE.TorusGeometry(1, 0.4, 32, 32);
const SphereGeometry2 = new THREE.SphereGeometry(1, 32, 32);
const toonMaterial = new THREE.MeshToonMaterial({
  gradientMap: toonMaterialTexture,
});
const torus = new THREE.Mesh(torusGeometry, toonMaterial);
torus.position.z = -15;
scene.add(torus);
const sphere2 = new THREE.Mesh(SphereGeometry2, toonMaterial);
sphere2.position.z = -15;
scene.add(sphere2);
const moonGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const moonMaterial = new THREE.MeshMatcapMaterial({
  map: moonMapTexture,
  // displacementMap: moonDisplacementTexture,
  color: 0xfafafa,
});
const moon = new THREE.Mesh(moonGeometry, moonMaterial);
moon.position.set(5, -15, -25);
scene.add(moon);
/**
 * Camera
 */
const cameraGroup = new THREE.Group();
const camera = new THREE.PerspectiveCamera(
  35,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(3, 3, 6);
cameraGroup.add(camera);
scene.add(cameraGroup);
/**
 * Lights
 */
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0, 3, 2);
scene.add(directionalLight);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas,
  alpha: true,
});
renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// Controls
// const controls = new OrbitControls(camera, canvas);

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
const cursor = {
  x: 0,
  y: 0,
};

window.addEventListener("mousemove", (event) => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = event.clientY / sizes.height - 0.5;
});

let { scrollY } = window;
window.addEventListener("scroll", (event) => {
  scrollY = window.scrollY;
});

const clock = new THREE.Clock();
let previousTime = 0;
/**
 * Animate
 */
const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - previousTime;
  previousTime = elapsedTime;
  particles.rotation.z = elapsedTime * 0.05;
  torus.position.x = -Math.sin(elapsedTime * 0.1) * 10;
  torus.position.y = -10 - Math.cos(elapsedTime * 0.1) * 10;
  torus.position.z = -Math.sin(elapsedTime * 0.1) * 10;

  sphere2.position.x = Math.sin(elapsedTime * 0.1) * 5;
  sphere2.position.y = -10 - Math.cos(elapsedTime * 0.1) * 5;
  sphere2.position.z = -15 - Math.sin(elapsedTime * 0.1) * 5;

  camera.position.y = (-scrollY / sizes.height) * objectsDistance;
  // Parallax
  const parallaxX = cursor.x * 0.5;
  const parallaxY = -cursor.y * 0.5;
  cameraGroup.position.x +=
    (parallaxX - cameraGroup.position.x) * deltaTime * 5;
  cameraGroup.position.y +=
    (parallaxY - cameraGroup.position.y) * deltaTime * 5;

  renderer.render(scene, camera);
  requestAnimationFrame(tick);
};
tick();
