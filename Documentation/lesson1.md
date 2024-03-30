# Personal Project - Chapter 1 - Three.js Journey

## Setting up a project

1. In an empty project create the new node project.

```console
npm init -y
```

This creates a package.json file with dependency information

2. Adding additional packages
- Vite
- Three.js

```console
Vite
npm install vite

Three.js
npm install three
```

> Installing Vite will add a `node_modules` folder with files for the dependencies.

The package.json will be updated with the new dependencies

`package.json`
``` 
...
  "license": "ISC",
  "dependencies": {
    "vite": "^5.2.7"
  }
```

> package-lock.json is optional but will ensure the exact versions of dependencies are installed

3. We need to create a `vite.config.js` file to help route the vite file. npm vite does not automatically create this

`vite.config.js`
```json
export default {

    root: 'src/',

    publicDir: '../static/',

    base: './',

    server:

    {

        host: true, // Open to local network and display URL

        open: !('SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env) // Open if it's not a CodeSandbox

    },

    build:

    {

        outDir: '../dist', // Output in the dist/ folder

        emptyOutDir: true, // Empty the folder first

        sourcemap: true // Add sourcemap

    },

}
```
### Note to self, having trouble installing vite via npm. Dive into it. Get comfortable getting it all properly setup

4. Add src and static folder for proper folder structure

```console
ProjectName
  /src
      index.html
      script.js
  /static
    package.json
    vite.config.js
```

5. Add script to the `index.html`

```html
<script type="module" src="./script.js"></script>`
```


---
Project is now working and routed.

## Adding THREE.js components

6. Importing three.js into the project

`script.js`
```js
import * as THREE from 'three'
```


> Elements are needed to get a scene setup
> > 1. A Scene that contains the objects
> > 2. Some Objects
> > 3. A Camera
> > 4. A Renderer

#### Scene
A container that will hold all the components that we will display

#### Objects
An item that can placed into a scene

7. Constructing a box with a red material and adding it to our scene

```js
// 8a. Geometry
const boxGeo = new THREE.BoxGeometry(2,3,4)
// 8b. Material
const material = new THREE.MeshBasicMaterial({color: 0xff0000})
// 8c. Mesh
const mesh = new THREE.Mesh(boxGeo, material)
// 9. Add box to scene
scene.add(mesh)
```

---
### Adding a Camera

A camera is used to frame what items will be rendered for the user

```js
// CAMERA
// Creating an object to hold screen sizes
const sizes = {
    width: 800,
    height: 600
}

// Paremeters ( fov, ASPECT RATIO)
// Good range for fov 45 - 75
const aspectRatio = sizes.width / sizes.height;
const camera = new THREE.PerspectiveCamera(75, aspectRatio)
camera.position.z = 3
scene.add(camera)
```

---
### Renderer
The renderer is used to render the scene, filled with objects, from the cameras perspective

1. Add a canvas to the `index.html`
`index.html`
```html
<canvas class="webgl"></canvas>
```
2. Create a Render object at the top of the script
```js
// Renderer
// setting the renderer to render for WebGL
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
//... 
```

3. Set the size of the rendering area and render the scene
```js
// Used to render the scene from the cameras perspective
renderer.setSize(sizes.width,sizes.height)

// Render The Scene
// Paremeters(scene to render, camera to render from)
renderer.render(scene, camera)
```