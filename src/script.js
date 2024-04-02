import * as THREE from 'three'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'

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

// ----------------------------------
// // CREATING GEOMETRY
const boxGeo = new THREE.BoxGeometry(1,1,1)
// 8b. Material
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
// 8c. Mesh
const mesh = new THREE.Mesh(boxGeo, material)
// 9. Add box to scene
scene.add(mesh)

// Loading Monkey Head
// // 1. GLTF Loader
// const gltfLoader = new GLTFLoader();
// const monkeyHeadPath = '../static/assets/MonkeysHead.glb'
// gltfLoader.load(monkeyHeadPath, function(glb) {
//     console.log(glb)
//     scene.add(glb);
// })




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
scene.add(camera)

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

    
    console.log(cursor)
})

//----------------------------------
    // RENDERER
    UpdateRenderer(renderer)
let count = 0;
const tick = () => {
    count++;
    let offset = count + (count / 2);
    // mesh.rotation.y += Math.sin(.05) * .05;
    // mesh.rotation.x += Math.cos(.01) * .05;
    mesh.position.y = Math.sin(count / 20);
    mesh.position.x = Math.cos(offset / 20);

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
