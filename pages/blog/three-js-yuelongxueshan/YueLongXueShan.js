import { useRef, Suspense } from "react";
import { useLoader, useFrame } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Canvas } from "react-three-fiber";
import { OrbitControls } from "drei";

const RayshaderModel = () => {
  const ref = useRef();
  const { nodes, materials } = useLoader(GLTFLoader, "/yuelongxueshan.glb");

  useFrame(() => {
    ref.current.rotation.y += 0.005;
  });

  return (
    <group ref={ref}>
      <mesh
        geometry={nodes.yulongxueshan.geometry}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[0.1, 0.1, 0.1]}
        material={materials.ray_surface}
      ></mesh>
    </group>
  );
};

const Scene = () => {
  return (
    <div style={{ height: 450, width: "100%" }}>
      <Canvas
        camera={{
          fov: 30,
          position: [0, 90, 150],
        }}
        shadowMap={true}
      >
        <ambientLight />
        <spotLight castShadow={true} intensity={1} position={[0, 100, 0]} />
        <pointLight position={[0, 20, 0]} color={"white"} intensity={1} />
        <Suspense fallback={null}>
          <RayshaderModel />
        </Suspense>
      </Canvas>
    </div>
  );
};

useLoader.preload(GLTFLoader, "/yuelongxueshan.glb");

export default Scene;
