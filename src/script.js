import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GUI } from 'lil-gui'

// ---------------------------------
// Canvas
// Referencing the canvas in from the index.html
const canvas = document.querySelector('canvas.webgl')

// Renderer
// setting the renderer to render for WebGL
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

// CREATING OUR SCENE
// First Scene
// 7. Creating a scene in three.js
const scene = new THREE.Scene()
const Gui = new GUI();

// ----------------------------------
// // CREATING GEOMETRY
const boxGeo = new THREE.BoxGeometry(1,1,1)
// 8b. Material
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
// 8c. Mesh
const mesh = new THREE.Mesh(boxGeo, material)
// 9. Add box to scene
// scene.add(mesh)

// Loading Monkey Head
// 1. GLTF Loader
const gltfLoader = new GLTFLoader();

let model = null;

const loader = gltfLoader.load("MonkeysHead.glb", (gltfScene) => {
    console.log(gltfScene)
    const sceneGltf = gltfScene.scene;
    model = sceneGltf.children[0];
    console.log(model);
    const modelMaterial = new THREE.MeshStandardMaterial({color: 0x00aaaa})
    modelMaterial.emissive = new THREE.Color(0x00aaaa)
    modelMaterial.emissiveIntensity = 90
    model.material = modelMaterial
    model.castShadow = true
    model.receiveShadow = true
    scene.add(gltfScene.scene)

    Gui.add(model.position, 'x').min(-10).max(10).step(.1)
})

// Reference Plane
const refPlane = new THREE.PlaneGeometry(5,5,5)

const refMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 })
console.log(refMaterial)
const refMesh = new THREE.Mesh(refPlane, refMaterial);

scene.add(refMesh)



//-----------------------------------
// CAMERA

// Creating an object to hold screen sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    get aspectRatio()  {
        return this.width / this.height
    },
    updateSizes: function(width, height) {
        this.width = width;
        this.height = height;
    }
    
}

// Paremeters ( fov, aspect ratio)
// Good range for fov 45 - 75
const aspectRatio = sizes.aspectRatio;
const camera = new THREE.PerspectiveCamera(75, aspectRatio)
camera.position.z = 3
console.log(camera)
scene.add(camera)

const controls = new OrbitControls(camera, renderer.domElement);

// Event ( Window Resize) 
window.addEventListener('resize', () => {
    // Update size of renderer
    sizes.updateSizes(window.innerWidth, window.innerHeight);
    
    // Update aspect ratio
    camera.aspect = sizes.aspectRatio
    
    UpdateRenderer(renderer)    
})

// Cursor
const cursor =  {
    x: 0,
    y: 0
}

window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / sizes.width - .5;
    cursor.y = event.clientY / sizes.height - .5;

})

// Light

const pointLight = new THREE.PointLight(0xffffff, 10);
const pointLightHelper = new THREE.PointLightHelper(pointLight)
scene.add(pointLightHelper)

// Add folder for point light controls
const pointLightFolder = Gui.addFolder('Point Light');

// Add controls for position
pointLightFolder.add(pointLight.position, 'x').min(-10).max(10).step(0.1).name('Position X');
pointLightFolder.add(pointLight.position, 'y').min(-10).max(10).step(0.1).name('Position Y');
pointLightFolder.add(pointLight.position, 'z').min(-10).max(10).step(0.1).name('Position Z');

// Add controls for rotation
pointLightFolder.add(pointLight.rotation, 'x').min(0).max(Math.PI * 2).step(0.1).name('Rotation X');
pointLightFolder.add(pointLight.rotation, 'y').min(0).max(Math.PI * 2).step(0.1).name('Rotation Y');
pointLightFolder.add(pointLight.rotation, 'z').min(0).max(Math.PI * 2).step(0.1).name('Rotation Z');
// Add control for intensity
pointLightFolder.add(pointLight, 'intensity').min(0).max(100).step(0.1).name('Intensity');


pointLight.position.set(0, 5, 5); // Set the position of the light
pointLight.castShadow = true; // Enable shadow casting
scene.add(pointLight);

//----------------------------------
    // RENDERER
    UpdateRenderer(renderer)
let count = 0;
const tick = () => {
    count++;
    let offset = count + (count / 2);
    // mesh.rotation.y += Math.sin(.05) * .05;
    // mesh.rotation.x += Math.cos(.01) * .05;
    // mesh.position.y = Math.sin(count / 20);
    // mesh.position.x = Math.cos(offset / 20);

    window.requestAnimationFrame(tick);
    renderer.render(scene, camera)   
}
tick();

console.log(scene)

// Functions

function UpdateRenderer(renderer) {
    // Used to render the scene from the cameras perspective
    renderer.setSize(sizes.width,sizes.height)

    // Render The Scene
    // Paremeters(scene to render, camera to render from)
    renderer.render(scene, camera)
    console.log(scene)
}
