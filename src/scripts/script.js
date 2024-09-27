import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xF2F3F4); // Scene background color

// Clickable Webpage Plane
const webpageWidth = 0.88; // Width of the plane
const webpageHeight = 0.64; // Height of the plane
const webpageGeometry = new THREE.PlaneGeometry(webpageWidth, webpageHeight);

// Create a black texture for the initial screen
const blackTexture = new THREE.TextureLoader().load('/path/to/black-image.png'); // Ensure this is a valid black image
const blackMaterial = new THREE.MeshBasicMaterial({ map: blackTexture, side: THREE.DoubleSide });

// Create the webpage plane with the black texture initially
const webpagePlane = new THREE.Mesh(webpageGeometry, blackMaterial);
scene.add(webpagePlane);
webpagePlane.position.set(0.03, 0.29, 0.0550); // Set the position of the webpage plane

// Load the actual website texture for later use
const webpageTexture = new THREE.TextureLoader().load('/website.png', function (texture) {
    texture.encoding = THREE.sRGBEncoding; // Correct texture encoding
});

// Models
const gltfLoader = new GLTFLoader();
const deskMaterial = new THREE.MeshBasicMaterial({ color: 0xf9f9f9 });
const glassMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
const mouseMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

// Load desk model
gltfLoader.load('/desk.glb', (gltf) => {
    gltf.scene.traverse((child) => {
        child.material = deskMaterial;
    });
    scene.add(gltf.scene);
});

// Load computer model and apply materials
gltfLoader.load('/computer.glb', (gltf) => {
    gltf.scene.traverse((child) => {
        child.material = glassMaterial;
    });
    scene.add(gltf.scene);
});

// Load mouse model
gltfLoader.load('/mouse.glb', (gltf) => {
    gltf.scene.traverse((child) => {
        child.material = mouseMaterial;
    });
    scene.add(gltf.scene);
});

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(window.devicePixelRatio);
});

// Camera/perspective
const camera = new THREE.PerspectiveCamera(16, sizes.width / sizes.height, 0.1, 100);
camera.position.set(0, 0, 0.01); // Start very close to the plane
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(window.devicePixelRatio);

// Animate
const clock = new THREE.Clock();
let zoomOutStartTime = null;

// Start the animation
setTimeout(() => {
    zoomOutStartTime = clock.getElapsedTime(); // Start the zoom out
}, 10);

const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    // If zooming out, interpolate the camera position
    if (zoomOutStartTime !== null) {
        const progress = (elapsedTime - zoomOutStartTime) / 1; // Duration of 1 second
        if (progress < 1) {
            camera.position.z = THREE.MathUtils.lerp(0.1, 6, progress); // Zoom out from 0.1 to 6
        } else {
            webpagePlane.material.map = webpageTexture; // Change to the actual image after zooming out
            zoomOutStartTime = null; // Reset zoom out
        }
    }

    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
};

tick();

// Function to handle zoom-in and redirect on click
const zoomInAndRedirect = (event) => {
    event.preventDefault();

    // Animate zooming into the webpage
    let zoomInStartTime = clock.getElapsedTime();
    const zoomInDuration = 1; // Duration of zoom-in animation

    const zoomInTick = () => {
        const elapsedTime = clock.getElapsedTime();
        const progress = (elapsedTime - zoomInStartTime) / zoomInDuration;

        if (progress < 1) {
            camera.position.z = THREE.MathUtils.lerp(6, 0.1, progress); // Zoom into the webpage
            requestAnimationFrame(zoomInTick);
        } else {
            window.location.href = '../home'; // Redirect to the desired page after zooming in
        }
    };

    zoomInTick();
};

// Use pointerdown event for better compatibility
window.addEventListener('pointerdown', zoomInAndRedirect);
