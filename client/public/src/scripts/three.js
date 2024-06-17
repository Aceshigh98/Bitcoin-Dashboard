import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
// Create a scene, camera, and renderer
const scene = new THREE.Scene();
const scene2 = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const camera2 = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// Set the camera position
camera.position.z = 5;
camera.position.set(0, 0, 1); // Set the camera1 position
camera.lookAt(scene.position);

camera2.position.z = 5;
camera2.position.set(4, 4, 4); // Set the camera2 position
camera2.lookAt(scene2.position);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.setSize(window.innerWidth, window.innerHeight);

const renderer2 = new THREE.WebGLRenderer();
renderer2.outputColorSpace = THREE.SRGBColorSpace;
renderer2.setSize(window.innerWidth, window.innerHeight);

document.getElementById("Model").appendChild(renderer.domElement);
document.getElementById("Model2").appendChild(renderer2.domElement);

// Add AmbientLight to the scene (provides overall light)
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Color, Intensity
scene.add(ambientLight);

const ambientLight2 = new THREE.AmbientLight(0xffffff, 10); // Color, Intensity
scene2.add(ambientLight2);

// Add DirectionalLight to the scene (simulates sunlight)
const directionalLight = new THREE.DirectionalLight(0xffffff, 20); // Color, Intensity
directionalLight.position.set(1, 1, 1); // Direction of light
scene.add(directionalLight);

const loader = new GLTFLoader().setPath("assets/BTCModel/");

const loader2 = new GLTFLoader().setPath("assets/Particles/");

let model;

let model2;

loader.load("scene.gltf", (gltf) => {
  model = gltf.scene;
  // Set the scale to make the model larger
  model.scale.set(8, 8, 8); // Adjust the scale factor as needed

  scene.add(model);
});

loader2.load("scene.gltf", (gltf) => {
  model2 = gltf.scene;
  // Set the scale to make the model larger
  model2.scale.set(20, 20, 20); // Adjust the scale factor as needed

  scene2.add(model2);
});

//Setting up Orbit Contols

// Animate the cube
const animate = () => {
  requestAnimationFrame(animate);

  //Rotate the models for animation

  if (model) {
    model.rotation.x += 0.01;
    model.rotation.y += 0.01;
  }

  if (model2) {
    model2.rotation.x += 0.001;
    model2.rotation.y += 0.001;
  }

  // Render the scene
  renderer.render(scene, camera);
  renderer2.render(scene2, camera);
};

// Start the animation
animate();
