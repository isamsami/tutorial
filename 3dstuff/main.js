import * as THREE from 'three';
import './style.css'

//scene
const scene = new THREE.Scene()

//make sphere
const geometry = new THREE.SphereGeometry(3, 64, 64)
const material = new THREE.MeshStandardMaterial({
  color: "#00ff83",
})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

//sizes of webpage
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}


//lights
const light = new THREE.PointLight(0xffffff, 10, 100)
light.position.set(0, 10, 10)
scene.add(light)

//camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 20
scene.add(camera)

//renderer
const canvas = document.querySelector(".webgl")
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)

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

//resize object
const loop = () => {
  renderer.render(scene, camera)
  window.requestAnimationFrame(loop)
}
loop()