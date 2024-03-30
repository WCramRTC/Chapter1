import * as THREE from 'three'

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
// CREATING GEOMETRY
// 8. Create a box to add to the scene
// Parameters (width, height, depth)
// Create the frame of the object, no material
// 8a. Geometry
const boxGeo = new THREE.BoxGeometry(1,1,1)
// 8b. Material
// Create a basic material
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
// 8c. Mesh
const mesh = new THREE.Mesh(boxGeo, material)
// 9. Add box to scene
scene.add(mesh)

//-----------------------------------
// CAMERA

// Creating an object to hold screen sizes
const sizes = {
    width: 800,
    height: 600
}

// Paremeters ( fov, aspect ratio)
// Good range for fov 45 - 75
const aspectRatio = sizes.width / sizes.height;
const camera = new THREE.PerspectiveCamera(75, aspectRatio)
camera.position.z = 3
scene.add(camera)


//----------------------------------
// RENDERER
// Used to render the scene from the cameras perspective
renderer.setSize(sizes.width,sizes.height)

// Render The Scene
// Paremeters(scene to render, camera to render from)
renderer.render(scene, camera)
console.log(scene)