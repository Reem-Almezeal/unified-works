
function Tree({ position, dark }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.35, 0]} castShadow>
        <cylinderGeometry args={[0.09, 0.13, 0.7, 8]} />
        <meshStandardMaterial color="#806B4D" />
      </mesh>

      <mesh position={[0, 1.05, 0]} castShadow>
        <coneGeometry args={[0.65, 1.5, 7]} />
        <meshStandardMaterial
          color={dark ? '#3E8C68' : '#5A9B71'}
          roughness={0.9}
        />
      </mesh>
    </group>
  )
}

export default function Roads({ dark = true }) {
  const roadColor = dark ? '#253832' : '#879B92'
  const groundColor = dark ? '#173B31' : '#D5E1D5'
  const curbColor = dark ? '#355C4C' : '#B5C9B9'
  const lineColor = dark ? '#78CDA8' : '#39836A'

  const trees = [
    [-10.7, -10.7],
    [-3.1, -10.7],
    [3.1, -10.7],
    [10.7, -10.7],
    [-10.7, -3.1],
    [-3.1, -3.1],
    [3.1, -3.1],
    [10.7, -3.1],
    [-10.7, 3.1],
    [-3.1, 3.1],
    [3.1, 3.1],
    [10.7, 3.1],
    [-10.7, 10.7],
    [-3.1, 10.7],
    [3.1, 10.7],
    [10.7, 10.7]
  ]

  return (
    <group>
      {/* Base */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[25, 25]} />
        <meshStandardMaterial
          color={groundColor}
          roughness={0.95}
        />
      </mesh>

      {/* Roads */}
      <mesh position={[0, 0.04, 0]} receiveShadow>
        <boxGeometry args={[3.8, 0.08, 25]} />
        <meshStandardMaterial color={roadColor} />
      </mesh>

      <mesh position={[0, 0.045, 0]} receiveShadow>
        <boxGeometry args={[25, 0.08, 3.8]} />
        <meshStandardMaterial color={roadColor} />
      </mesh>

      {/* Sidewalks */}
      {[-6.9, 6.9].flatMap(x =>
        [-6.9, 6.9].map(z => (
          <mesh
            key={`${x}-${z}`}
            position={[x, 0.11, z]}
            receiveShadow
          >
            <boxGeometry args={[10.4, 0.22, 10.4]} />
            <meshStandardMaterial color={curbColor} />
          </mesh>
        ))
      )}

      {/* Road edge GIS lighting */}
      {[-1.93, 1.93].map(value => (
        <group key={value}>
          <mesh position={[value, 0.095, 0]}>
            <boxGeometry args={[0.045, 0.012, 25]} />
            <meshBasicMaterial color={lineColor} />
          </mesh>

          <mesh position={[0, 0.095, value]}>
            <boxGeometry args={[25, 0.012, 0.045]} />
            <meshBasicMaterial color={lineColor} />
          </mesh>
        </group>
      ))}

      {/* Lane markings */}
      {Array.from({ length: 10 }, (_, i) => {
        const coordinate = -11.25 + i * 2.5

        return (
          <group key={i}>
            <mesh position={[0, 0.095, coordinate]}>
              <boxGeometry args={[0.07, 0.012, 1.05]} />
              <meshBasicMaterial color="#D7BC82" />
            </mesh>

            <mesh position={[coordinate, 0.095, 0]}>
              <boxGeometry args={[1.05, 0.012, 0.07]} />
              <meshBasicMaterial color="#D7BC82" />
            </mesh>
          </group>
        )
      })}

      {/* Landscaping */}
      {trees.map(([x, z], index) => (
        <Tree
          key={index}
          position={[x, 0.22, z]}
          dark={dark}
        />
      ))}
    </group>
  )
}


