import { useRef, Suspense } from "react";
import { useLoader, useFrame } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Canvas } from "react-three-fiber";
import { OrbitControls } from "drei";
import { useState } from "react";
import * as THREE from "three";
import { Button } from "../styled/element/Button";

const RayshaderModel = ({ overlay }) => {
  const ref = useRef();
  const { nodes, materials } = useLoader(GLTFLoader, "/yuelongxueshan.glb");

  useFrame(() => {
    ref.current.rotation.y += 0.005;
  });

  const rayProps = {
    geometry: nodes.yulongxueshan.geometry,
    rotation: [Math.PI / 2, 0, 0],
    scale: [0.1, 0.1, 0.1],
    material: materials.ray_surface,
  };

  const materialProps = {
    geometry: nodes.yulongxueshan.geometry,
    rotation: [Math.PI / 2, 0, 0],
    scale: [0.1, 0.1, 0.1],
    receiveShadow: true,
    castShadow: true,
  };

  const props = overlay ? rayProps : materialProps;

  return (
    <group ref={ref}>
      <mesh {...props}>
        {!overlay && (
          <meshStandardMaterial
            color='#A87A65'
            side={THREE.DoubleSide}
            roughness={0.8}
            metalness={0.4}
          />
        )}
      </mesh>
    </group>
  );
};

const Scene = () => {
  const [orbit, setOrbit] = useState(false);
  const [overlay, toggleOverlay] = useState(true);

  return (
    <>
      <Button
        onClick={() => toggleOverlay((prevState) => !prevState)}
        style={{
          background: overlay ? "#2C8CBE" : "",
          color: overlay ? "#FFFFFE" : "",
          opacity: overlay ? 1 : 0.5,
        }}
      >
        Satellite overlay
      </Button>
      <Button
        onClick={() => setOrbit((prevState) => !prevState)}
        style={{
          background: orbit ? "#2C8CBE" : "",
          color: orbit ? "#FFFFFE" : "",
          opacity: orbit ? 1 : 0.5,
        }}
      >
        Enable controls
      </Button>
      <div style={{ height: 450, width: "100%" }}>
        <Canvas
          camera={{
            fov: 30,
            position: [0, 90, 150],
          }}
          shadowMap={true}
        >
          <ambientLight />
          <spotLight
            intensity={1}
            position={overlay ? [0, 100, 0] : [70, 20, 30]}
          />
          <pointLight
            position={[0, 20, 0]}
            color={overlay ? "#FBAA68" : "#31736C"}
            intensity={0.4}
          />
          <Suspense fallback={null}>
            <RayshaderModel overlay={overlay} />
          </Suspense>
          {orbit && <OrbitControls />}
        </Canvas>
      </div>
    </>
  );
};

useLoader.preload(GLTFLoader, "/yuelongxueshan.glb");

export default Scene;
