import { useRef, useEffect, useState } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

const vertexShader = `
  uniform mat4 projectionMatrix;
  uniform mat4 viewMatrix;
  uniform mat4 modelMatrix;
  uniform float uTime;

  attribute vec3 position;
  attribute vec3 color;

  varying vec3 vColor; 

  void main () 
  {
      vec4 modelPosition = modelMatrix * vec4(position, 1.0);
      modelPosition.y += sin(modelPosition.x + uTime) * 0.2;
      
      vec4 viewPosition = viewMatrix * modelPosition;
      vec4 projectionPosition = projectionMatrix * viewPosition;

      gl_Position = projectionPosition;
      gl_PointSize = 60.0 / - viewPosition.z;

      vColor = color;
  }
`

const fragmentShader = `
  precision mediump float; 

  varying vec3 vColor;

  void main()
  {
      float strength = 1.0 - distance(gl_PointCoord, vec2(0.5));
      strength = pow(strength, 4.0);

      // apply color 
      vec3 color = mix(vec3(0.0), vColor, strength);

      gl_FragColor = vec4(color, strength);   
  }
`

const generateParticles = (width, length) => {
  const numPoints = width * length

  const positions = new Float32Array(numPoints * 3)
  const colors = new Float32Array(numPoints * 3)

  //* Handle the colors
  const colorHigh = new THREE.Color("#B8F3FF")
  const colorLow = new THREE.Color("#5B7FE9")

  let k = 0

  for (let i = 0; i < width; i++) {
    for (let j = 0; j < length; j++) {
      const u = i / width
      const v = j / length

      const x = u - 0.5
      const y = (Math.sin(u * Math.PI * 10) + Math.sin(v * Math.PI * 6)) / 20
      const z = v - 0.5

      positions[3 * k] = x
      positions[3 * k + 1] = y
      positions[3 * k + 2] = z

      //* Color
      const mixedColor = colorHigh.clone()
      mixedColor.lerp(colorLow, u)

      colors[k * 3 + 0] = mixedColor.r
      colors[k * 3 + 1] = mixedColor.g
      colors[k * 3 + 2] = mixedColor.b

      k++
    }
  }

  return { positions, colors }
}

const Points = ({ scroll }) => {
  const mesh = useRef()
  const material = useRef()

  const { positions, colors } = generateParticles(200, 200)

  useFrame(({ clock, camera, mouse }) => {
    camera.position.z = mouse.x
    camera.position.y = 1 - scroll.current / 100
    camera.lookAt(mesh.current.position)
    mesh.current.rotation.y = clock.elapsedTime / 10
    material.current.uniforms.uTime.value = clock.elapsedTime
  })

  return (
    <points ref={mesh} scale={[20, 10, 20]}>
      <bufferGeometry attach='geometry'>
        <bufferAttribute
          attachObject={["attributes", "position"]}
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attachObject={["attributes", "color"]}
          count={colors.length}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <rawShaderMaterial
        attach='material'
        ref={material}
        uniforms={{
          uTime: { value: 0 },
        }}
        size={0.1}
        vertexColors={true}
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        transparent
        alphaTest={0.001}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export default Points
