// @ts-nocheck
import { usePlane, useSphere } from "@react-three/cannon"
import { useFrame, useThree } from "@react-three/fiber"

export default function Player(props) {
  const viewport = useThree((state) => state.viewport)

  // _ player
  const [player, { position, rotation }] = useSphere(() => ({
    type: "Kinematic",
    args: [3],
    mass: 10,
    ...props,
  }))

  // _ ground
  usePlane(() => ({
    rotation: [-Math.PI * 0.5, 0, 0],
    position: [0, 0.1, 0],
    args: [viewport.width, viewport.height],
  }))

  // _ walls
  //* top
  usePlane(() => ({
    rotation: [0, 0, 0],
    position: [0, 0, -viewport.height / 2],
    args: [viewport.width, viewport.height],
  }))

  //* bottom
  usePlane(() => ({
    rotation: [Math.PI, 0, 0],
    position: [0, 0, viewport.height / 2],
    args: [viewport.width, viewport.height],
  }))

  //* left
  usePlane(() => ({
    rotation: [0, Math.PI * 0.5, 0],
    position: [-viewport.width / 2, 0, 0],
    args: [viewport.width, viewport.height],
  }))

  //* right
  usePlane(() => ({
    rotation: [0, -Math.PI * 0.5, 0],
    position: [viewport.width / 2, 0, 0],
    args: [viewport.width, viewport.height],
  }))

  useFrame(({ mouse }) => {
    const x = (mouse.x * viewport.width) / 2
    const y = (mouse.y * viewport.height) / 2
    position.set(x, 0, -y)
    rotation.set(-y, 0, x)
  })

  return <pointLight ref={player} intensity={10} color='white' distance={8} />
}
