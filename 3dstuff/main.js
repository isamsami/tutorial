import * as THREE from 'three';
import './style.css'
import gsap from 'gsap';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


//scene
const scene = new THREE.Scene()

//texture for planets
const suntexture = new THREE.TextureLoader().load('8k_sun.jpg')

//make sun
const sungeo = new THREE.SphereGeometry(3, 32, 32)
const material = new THREE.MeshStandardMaterial({
  map: suntexture
})
const sunmesh = new THREE.Mesh(sungeo, material)
scene.add(sunmesh)

//make random stars
const starsGeometry = new THREE.BufferGeometry();
const starsMaterial = new THREE.PointsMaterial({ color: 0xFFFFFF, size: 0.1 });

const starsVertices = [];
for (let i = 0; i < 1000; i++) {
  const x = (Math.random() - 0.5) * 2000;
  const y = (Math.random() - 0.5) * 2000;
  const z = (Math.random() - 0.5) * 2000;
  starsVertices.push(x, y, z);
}

starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
const stars = new THREE.Points(starsGeometry, starsMaterial);
scene.add(stars);

//sizes of webpage
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}


//lights
const alight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(alight)

const dlight = new THREE.DirectionalLight(0xffffff, 10)
dlight.position.set(5, 2, 5)
scene.add(dlight)

//camera
const camera = new THREE.PerspectiveCamera(100, sizes.width / sizes.height, 0.1, 1000)
camera.position.z = 20
scene.add(camera)


//renderer
const canvas = document.querySelector(".webgl")
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)

//controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.autoRotate = true
controls.autoRotateSpeed = 3

//resize window
window.addEventListener("resize", () => {
  //update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight
  //update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height)
})


//loop through resize and update
const loop = () => {
  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(loop)
}
loop()

//timeline magic
const tl = gsap.timeline({defaults: {duration: 1 }})
tl.fromTo("nav", {y: "-100%"}, {y: "0%"})
tl.fromTo(mesh.scale, {z: 0, x: 0, y: 0}, {z: 1, x: 1, y: 1})


//mouse animation color
let mouseDown = false
window.addEventListener("mouseDown", () => (mouseDown = true))
window.addEventListener("mouseup", () => (mouseDown = false))