
import { OrbitControls } from '@react-three/drei'

export default function CameraController() {
  return (
    <OrbitControls
      makeDefault
      enablePan={false}
      enableDamping
      dampingFactor={0.06}
      enableZoom
      minDistance={20}
      maxDistance={43}
      minPolarAngle={0.45}
      maxPolarAngle={Math.PI / 2.35}
      target={[0, 2, 0]}
      autoRotate
      autoRotateSpeed={0.3}
    />
  )
}

