import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Canvas & Scene
const canvas = document.querySelector('canvas.webgl');
const scene  = new THREE.Scene();
scene.background = new THREE.Color(0xE9EBEC);

// ———————————————————————
// Webpage Plane (initially black)
// ———————————————————————
const webpageWidth  = 0.88;
const webpageHeight = 0.64;
const webpageGeometry = new THREE.PlaneGeometry(webpageWidth, webpageHeight);

const blackTexture  = new THREE.TextureLoader().load('/path/to/black-image.png');
const blackMaterial = new THREE.MeshBasicMaterial({
  map: blackTexture,
  side: THREE.DoubleSide
});

const webpagePlane = new THREE.Mesh(webpageGeometry, blackMaterial);
webpagePlane.position.set(0.03, 0.29, 0.0550);
scene.add(webpagePlane);

// Preload real webpage texture
let webpageTexture = null;
new THREE.TextureLoader().load('/website.png', tex => {
  tex.encoding = THREE.sRGBEncoding;
  webpageTexture = tex;
});

// ———————————————————————
// Load Models & build clickable list
// ———————————————————————
const clickableMeshes = [ webpagePlane ];
const gltfLoader      = new GLTFLoader();
const deskMaterial    = new THREE.MeshBasicMaterial({ color: 0xF9F9F9});
const glassMaterial   = new THREE.MeshBasicMaterial({ color: 0xF9F9F9 });
const mouseMaterial   = new THREE.MeshBasicMaterial({ color: 0xF9F9F9 });

// Desk
gltfLoader.load('/desk.glb', gltf => {
  gltf.scene.traverse(child => {
    if (child.isMesh) child.material = deskMaterial;
  });
  scene.add(gltf.scene);
});

// Computer (screen frame will be clickable)
gltfLoader.load('/computer.glb', gltf => {
  gltf.scene.traverse(child => {
    if (child.isMesh) {
      child.material = glassMaterial;
      clickableMeshes.push(child);
    }
  });
  scene.add(gltf.scene);
});

// Mouse
gltfLoader.load('/mouse.glb', gltf => {
  gltf.scene.traverse(child => {
    if (child.isMesh) child.material = mouseMaterial;
  });
  scene.add(gltf.scene);
});

// ———————————————————————
// Camera & Controls
// ———————————————————————
const sizes = { width: window.innerWidth, height: window.innerHeight };
const camera = new THREE.PerspectiveCamera(16, sizes.width / sizes.height, 0.1, 100);
camera.position.set(0, 0, 0.01);
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// ———————————————————————
// Renderer
// ———————————————————————
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(window.devicePixelRatio);

// ———————————————————————
// Raycaster & Mouse
// ———————————————————————
const raycaster = new THREE.Raycaster();
const mouse     = new THREE.Vector2();

window.addEventListener('mousemove', e => {
  mouse.x = (e.clientX / sizes.width) * 2 - 1;
  mouse.y = - (e.clientY / sizes.height) * 2 + 1;
});

// ———————————————————————
// Initial “zoom out” on load
// ———————————————————————
const clock = new THREE.Clock();
let zoomOutStartTime = null;

setTimeout(() => {
  zoomOutStartTime = clock.getElapsedTime();
}, 10);

// ———————————————————————
// Click-to-zoom handler
// ———————————————————————
let isAnimating = false;

window.addEventListener('pointerup', () => {
  if (isAnimating) return;
  raycaster.setFromCamera(mouse, camera);
  const hits = raycaster.intersectObjects(clickableMeshes, false);
  if (hits.length) zoomToIntersect(hits[0]);
});

function zoomToIntersect(intersect) {
  isAnimating     = true;
  controls.enabled = false;

  const duration  = 1; // seconds
  const startTime = clock.getElapsedTime();

  const startPos    = camera.position.clone();
  const startTarget = controls.target.clone();

  // Hit point & face normal in world space
  const worldPoint = intersect.point.clone();
  const normal     = intersect.face.normal.clone()
                        .transformDirection(intersect.object.matrixWorld)
                        .normalize();

  // End position 0.2 units off the surface
  const endPos    = worldPoint.clone().add(normal.multiplyScalar(0.2));
  const endTarget = worldPoint.clone();

  (function animate() {
    const t = Math.min((clock.getElapsedTime() - startTime) / duration, 1);
    camera.position.lerpVectors(startPos,    endPos,    t);
    controls.target.lerpVectors(startTarget, endTarget, t);
    controls.update();
    renderer.render(scene, camera);

    if (t < 1) {
      requestAnimationFrame(animate);
    } else {
      // If you clicked the plane, swap in the real webpage texture first
      if (intersect.object === webpagePlane && webpageTexture) {
        webpagePlane.material.map = webpageTexture;
      }
      window.location.href = '../home';
    }
  })();
}

// ———————————————————————
// Main render loop
// ———————————————————————
const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // initial zoom-out
  if (zoomOutStartTime !== null) {
    const prog = (elapsedTime - zoomOutStartTime) / 1;
    if (prog < 1) {
      camera.position.z = THREE.MathUtils.lerp(0.1, 6, prog);
    } else if (webpageTexture) {
      webpagePlane.material.map = webpageTexture;
      zoomOutStartTime = null;
    }
  }

  if (!isAnimating) controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
};

tick();
