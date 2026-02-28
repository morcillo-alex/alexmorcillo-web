import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const canvas = document.getElementById('three-canvas') as HTMLCanvasElement;
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0c0c14);

const camera = new THREE.PerspectiveCamera(50, 16 / 9, 0.1, 100);
camera.position.set(2.5, 2, 3);

// Cube with accent green material
const geometry = new THREE.BoxGeometry(1.4, 1.4, 1.4, 4, 4, 4);
const material = new THREE.MeshStandardMaterial({
	color: 0x2acf62,
	metalness: 0.3,
	roughness: 0.4,
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Wireframe overlay
const wireGeo = new THREE.EdgesGeometry(geometry);
const wireMat = new THREE.LineBasicMaterial({ color: 0x5fffaa, transparent: true, opacity: 0.3 });
const wire = new THREE.LineSegments(wireGeo, wireMat);
cube.add(wire);

// Lights
scene.add(new THREE.AmbientLight(0xffffff, 0.4));

const pointLight = new THREE.PointLight(0x2acf62, 30, 20);
pointLight.position.set(3, 4, 3);
scene.add(pointLight);

const fillLight = new THREE.PointLight(0x8844ff, 15, 20);
fillLight.position.set(-3, -2, -3);
scene.add(fillLight);

// Grid floor
const grid = new THREE.GridHelper(10, 20, 0x1e293b, 0x1e293b);
grid.position.y = -1.2;
scene.add(grid);

// Orbit controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

function animate() {
	requestAnimationFrame(animate);
	cube.rotation.x += 0.005;
	cube.rotation.y += 0.008;
	controls.update();
	renderer.render(scene, camera);
}

function resize() {
	const rect = canvas.getBoundingClientRect();
	renderer.setSize(rect.width, rect.height, false);
}

resize();
animate();
window.addEventListener('resize', resize);
