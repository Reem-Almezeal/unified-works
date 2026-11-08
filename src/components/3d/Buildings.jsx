
import { useMemo } from 'react'
import { RoundedBox } from '@react-three/drei'

const BUILDINGS = [ 
  [-8.5, -8.5, 2.6, 6.5, 2.6],
  [-5.1, -8.5, 2.5, 10, 2.6],
  [5.1, -8.5, 2.5, 7.5, 2.6],
  [8.5, -8.5, 2.6, 12, 2.6],
  [-8.5, -5.1, 2.6, 8, 2.5],
  [-5.1, -5.1, 2.5, 5, 2.5],
  [5.1, -5.1, 2.5, 11, 2.5],
  [8.5, -5.1, 2.6, 6.5, 2.5],
  [-8.5, 5.1, 2.6, 7, 2.5],
  [-5.1, 5.1, 2.5, 12, 2.5],
  [5.1, 5.1, 2.5, 6, 2.5],
  [8.5, 5.1, 2.6, 9, 2.5],
  [-8.5, 8.5, 2.6, 5.5, 2.6],
  [-5.1, 8.5, 2.5, 7.5, 2.6],
  [5.1, 8.5, 2.5, 9.5, 2.6],
  [8.5, 8.5, 2.6, 7, 2.6]
]

function Building({ data, index, dark }) {
  const [x, z, width, height, depth] = data

  const windows = useMemo(() => {
    const result = []
    const floors = Math.floor((height - 0.5) / 0.7)
    const columns = Math.max(2, Math.floor(width / 0.58))

    for (let floor = 0; floor < floors; floor++) {
      for (let col = 0; col < columns; col++) {
        if ((floor * 5 + col * 3 + index) % 7 === 0) continue

        const wx = (col - (columns - 1) / 2) * 0.58
        const wy = 0.48 + floor * 0.7

        result.push([wx, wy, depth / 2 + 0.015, 0])
        result.push([wx, wy, -depth / 2 - 0.015, Math.PI])
      }
    }

    return result
  }, [width, height, depth, index])

  const colors = dark
    ? ['#284B43', '#42675B', '#35564E', '#537467']
    : ['#8DA99D', '#B0C0B2', '#799A8E', '#C1C9BC']

  return (
    <group position={[x, 0, z]}>
      <RoundedBox
        args={[width, height, depth]}
        radius={0.06}
        smoothness={2}
        position={[0, height / 2, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color={colors[index % colors.length]}
          metalness={0.35}
          roughness={0.48}
        />
      </RoundedBox>

      {windows.map(([wx, wy, wz, rotation], i) => (
        <mesh
          key={i}
          position={[wx, wy, wz]}
          rotation={[0, rotation, 0]}
        >
          <planeGeometry args={[0.29, 0.35]} />
          <meshStandardMaterial
            color={dark ? '#E7D5A2' : '#527D75'}
            emissive={dark ? '#D4B877' : '#3C786A'}
            emissiveIntensity={dark ? 0.48 : 0.12}
            side={2}
          />
        </mesh>
      ))}

      <mesh position={[0, height + 0.08, 0]} castShadow>
        <boxGeometry
          args={[width + 0.16, 0.16, depth + 0.16]}
        />
        <meshStandardMaterial
          color={dark ? '#89A99A' : '#E2E8DC'}
          metalness={0.35}
        />
      </mesh>

      <mesh position={[width / 2 + 0.025, height / 2, 0]}>
        <boxGeometry args={[0.05, height, 0.06]} />
        <meshBasicMaterial
          color={dark ? '#A9D9BE' : '#3C8B72'}
        />
      </mesh>
    </group>
  )
}

export default function Buildings({ dark = true }) {
  return (
    <group>
      {BUILDINGS.map((building, index) => (
        <Building
          key={index}
          data={building}
          index={index}
          dark={dark}
        />
      ))}
    </group>
  )
}
