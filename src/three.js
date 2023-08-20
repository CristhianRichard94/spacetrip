import * as THREE from "three";
import * as lil from "lil-gui";

import gsap from "gsap";

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
  size: 0.04,
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

const particles2Geometry = new THREE.SphereGeometry(0.5, 32, 32);
const particles2Material = new THREE.PointsMaterial({
  size: 0.05,
  color: 0xffccff,
});
const particles2 = new THREE.Points(particles2Geometry, particles2Material);
particles2.position.set(0, 0, -3);
particles2Geometry.setAttribute(
  "position",
  new THREE.BufferAttribute(positions2, 3)
);
scene.add(particles2);
const objectsDistance = 4;

/**
 * Objects
 */
const sectionMeshes = [];
const torusGeometry = new THREE.TorusGeometry(1, 0.4, 32, 32);
const SphereGeometry2 = new THREE.SphereGeometry(1, 32, 32);
const toonMaterial = new THREE.MeshToonMaterial({
  gradientMap: toonMaterialTexture,
});
const torus = new THREE.Mesh(torusGeometry, toonMaterial);

const sphere = new THREE.Mesh(SphereGeometry2, toonMaterial);
sphere.position.z = -15;

const moonGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const moonMaterial = new THREE.MeshMatcapMaterial({
  map: moonMapTexture,
  color: 0xfafafa,
});
const moon = new THREE.Mesh(moonGeometry, moonMaterial);
moon.position.set(5, -15, -10);

const cone = new THREE.Mesh(new THREE.ConeGeometry(0.5, 1), toonMaterial);
const torusKnot = new THREE.Mesh(
  new THREE.TorusKnotGeometry(1.2, 0.5),
  toonMaterial
);
cone.position.x = 0;
cone.position.z = -10;
sphere.position.x = 5;
sphere.position.z = -10;
torusKnot.position.x = 6;
torusKnot.position.z = -10;
torus.position.x = 3;
torus.position.z = -10;
moon.position.x = -0.5;

sectionMeshes.push(torus, sphere, cone, torusKnot, moon);
scene.add(cone, sphere, torusKnot, torus, torusKnot, moon);

sectionMeshes.forEach(
  (mesh, index) => (mesh.position.y = -objectsDistance * index * 2)
);

torus.position.y = -3;
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
let currentSection,
  previousSection = 0;
window.addEventListener("scroll", (event) => {
  scrollY = window.scrollY;
  currentSection = Math.round(scrollY / sizes.height);
  if (currentSection !== previousSection) {
    previousSection = currentSection;

    gsap.to(sectionMeshes[currentSection].rotation, {
      x: "+=6",
      z: "+=4",
    });
  }
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

  sectionMeshes.forEach((mesh, index) => {
    mesh.rotation.x = elapsedTime * 0.3;
    mesh.rotation.z = elapsedTime * 0.2;
  });

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
