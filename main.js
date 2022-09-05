import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(0);
camera.position.setX(0);

renderer.render(scene, camera);

// Torus

const geometry = new THREE.TorusGeometry(30, 10, 10, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xff6347, wireframe: true });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers


const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.OctahedronGeometry(5, 0);
  const material = new THREE.MeshStandardMaterial({ color: 0xff6347, wireframe: true });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(150));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(250).fill().forEach(addStar);

// Background

const spaceTexture = new THREE.TextureLoader().load('c68820f9fdc0663ef6f20b046f7e02d6.jpg');
scene.background = spaceTexture;




// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  camera.position.z = t * -0.01;
 
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.z += 0.005;
  


  controls.update();

  renderer.render(scene, camera);
}

animate();