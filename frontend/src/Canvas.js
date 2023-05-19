import { useRef, useEffect } from 'react'
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber'
import { useGLTF, useTexture, AccumulativeShadows, RandomizedLight, Decal, Environment, Center } from '@react-three/drei'

import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
// import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
// import { STLLoader } from 'three/addons/loaders/STLLoader.js';

import {STLLoader} from "three/examples/jsm/loaders/STLLoader";
import { easing } from 'maath'
import { useSnapshot } from 'valtio'
import { state } from './store'

export const App = ({ position = [0, 0, 2.5], fov = 25 }) => (
  
   <Canvas shadows camera={{ position, fov }} gl={{ preserveDrawingBuffer: true }} eventSource={document.getElementById('root')} eventPrefix="client">
    <ambientLight intensity={0.5} />
     <Environment preset="city" />
     <CameraRig>
       <Backdrop /> 
         <BikeAdapter />
       </CameraRig>
     <OrbitControls />
   </Canvas>
)

function Backdrop() {
  const shadows = useRef()
  useFrame((state, delta) => easing.dampC(shadows.current.getMesh().material.color, state.color, 0.25, delta))
  return (
    <AccumulativeShadows ref={shadows} temporal frames={60} alphaTest={0.85} scale={10} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.14]}>
      <pointLight position={[0, 900, 0]} intensity={1.5} />
      <RandomizedLight amount={4} radius={9} intensity={0.55} ambient={0.25} position={[5, 5, -10]} />
      <RandomizedLight amount={4} radius={5} intensity={0.25} ambient={0.55} position={[-5, 5, -9]} />
    </AccumulativeShadows>
  )
}

function CameraRig({ children }) {
  const group = useRef()
  const snap = useSnapshot(state)
  // AlN Commented out, cause STL object to move with mouse movements
  // useFrame((state, delta) => {
  //   easing.damp3(state.camera.position, [snap.intro ? -state.viewport.width / 4 : 0, 0, 2], 0.25, delta)
  //   easing.dampE(group.current.rotation, [state.pointer.y / 10, -state.pointer.x / 5, 0], 0.25, delta)
  // })
  return <group ref={group}>{children}</group>
}

function BikeAdapter(props) {
  const snap = useSnapshot(state)
  const texture = useTexture(`/${snap.decal}.png`)

  const material = new THREE.MeshPhysicalMaterial({
    metalness: .9, roughness: 0.6, color: 0x0ad2ff
  })

  const geom = useLoader(STLLoader, "/defaultBikeAdapter.stl") 

  const ref = useRef();
  const {camera} = useThree();
  useEffect(() => {
      camera.lookAt(ref.current.position);
  });

  console.log(geom)

  useFrame((state, delta) => easing.dampC(material.color, snap.color, 0.25, delta))
  return (
    <mesh ref={ref} castShadow rotation-x = { 0.5 } rotation-z = { 0.9 } rotation-y = { -1 } geometry={geom} position = {[0.2, -0.1, 0.26]} scale={[.006, .006, .006]} material={material} material-roughness={1} {...props} dispose={null}>
      {/* <Decal position={[0, 0.04, 0.15]} rotation={[0, 0, 0]} scale={0.15} map={texture} map-anisotropy={16} /> */}
    </mesh>
  )

      //<mesh castShadow geometry={nodes.originalBikeAdapter.geometry} material={materials.lambert1} material-roughness={1} {...props} dispose={null}>
    //  <Decal position={[0, 0.04, 0.15]} rotation={[0, 0, 0]} scale={0.15} map={texture} map-anisotropy={16} />
    //</mesh>
}

//useGLTF.preload('/originalBikeAdapter.glb')
useGLTF.preload('/shirt_baked_collapsed.glb')
;['/react.png', '/three2.png', '/pmndrs.png'].forEach(useTexture.preload)
