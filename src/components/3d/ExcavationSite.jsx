
import { useState } from 'react'
import { Html } from '@react-three/drei'

function Barrier({ position, rotation = 0 }) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <mesh position={[0, 0.45, 0]}>
        <boxGeometry args={[1.15, 0.45, 0.13]} />
        <meshStandardMaterial color="#E7A646" />
      </mesh>

      {[-0.35, 0.1].map((x, i) => (
        <mesh
          key={i}
          position={[x, 0.45, 0.071]}
          rotation={[0, 0, -0.5]}
        >
          <boxGeometry args={[0.14, 0.5, 0.018]} />
          <meshBasicMaterial color="#F5F0DE" />
        </mesh>
      ))}

      {[-0.48, 0.48].map(x => (
        <mesh key={x} position={[x, 0.17, 0]}>
          <boxGeometry args={[0.1, 0.34, 0.15]} />
          <meshStandardMaterial color="#B98236" />
        </mesh>
      ))}
    </group>
  )
}

export default function ExcavationSite({
  dark = true,
  language = 'ar'
}) {
  const [open, setOpen] = useState(false)
  const ar = language === 'ar'

  return (
    <group position={[0, 0.15, 0]}>
      {/* Excavation perimeter */}
      <mesh
        onClick={event => {
          event.stopPropagation()
          setOpen(value => !value)
        }}
      >
        <boxGeometry args={[2.9, 0.14, 2.9]} />
        <meshStandardMaterial color="#A98455" />
      </mesh>

      {/* Exposed soil */}
      <mesh position={[0, 0.09, 0]}>
        <boxGeometry args={[2.3, 0.08, 2.3]} />
        <meshStandardMaterial color="#3C3027" />
      </mesh>

      {/* Utility pipes */}
      {[0, 0.5].map((z, i) => (
        <mesh
          key={i}
          position={[0, 0.19, z]}
          rotation={[0, 0, Math.PI / 2]}
        >
          <cylinderGeometry
            args={[i === 0 ? 0.17 : 0.11, i === 0 ? 0.17 : 0.11, 2.15, 16]}
          />
          <meshStandardMaterial
            color={i === 0 ? '#53A8C3' : '#D4A05B'}
            metalness={0.55}
            roughness={0.35}
          />
        </mesh>
      ))}

      {/* Barriers */}
      <Barrier position={[-0.7, 0.12, 1.55]} />
      <Barrier position={[0.7, 0.12, 1.55]} />
      <Barrier
        position={[-1.55, 0.12, 0]}
        rotation={Math.PI / 2}
      />
      <Barrier
        position={[1.55, 0.12, 0]}
        rotation={Math.PI / 2}
      />

      {/* GIS detection ring */}
      <mesh
        position={[0, 0.15, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <ringGeometry args={[1.8, 1.86, 64]} />
        <meshBasicMaterial
          color={dark ? '#A9F0CA' : '#227C60'}
          transparent
          opacity={0.9}
          side={2}
          depthWrite={false}
        />
      </mesh>

      {/* Interaction */}
      <Html
        position={[0, 2.3, 0]}
        center
        distanceFactor={14}
      >
        <button
          type="button"
          onClick={() => setOpen(value => !value)}
          style={{
            background: '#103B31',
            color: '#B8F0D0',
            border: '1px solid #80D6AC',
            borderRadius: 30,
            padding: '9px 14px',
            fontSize: 12,
            whiteSpace: 'nowrap',
            cursor: 'pointer',
            boxShadow: '0 8px 28px #0007'
          }}
        >
          {ar ? 'موقع الحفر +' : 'Excavation Site +'}
        </button>
      </Html>

      {open && (
        <Html
          position={[0, 4.6, 0]}
          center
          distanceFactor={12}
        >
          <div
            dir={ar ? 'rtl' : 'ltr'}
            style={{
              width: 250,
              padding: 18,
              borderRadius: 16,
              background: '#102B25',
              color: '#F5F2E8',
              border: '1px solid #83D6AC',
              boxShadow: '0 20px 55px #0009',
              fontFamily: 'inherit'
            }}
          >
            <strong>
              {ar ? 'توثيق أعمال الحفر' : 'Excavation Documentation'}
            </strong>

            <p style={{ fontSize: 12, lineHeight: 1.9 }}>
              {ar
                ? 'توثيق الموقع والصور والتصاريح وربط العمل بالمقاول والجهة المشرفة.'
                : 'Document location, photos, permits, contractor, and supervising authority.'}
            </p>

            <button
              type="button"
              onClick={() => setOpen(false)}
              style={{
                background: '#A9D9BE',
                color: '#102B25',
                border: 0,
                borderRadius: 8,
                padding: '7px 14px',
                cursor: 'pointer'
              }}
            >
              {ar ? 'إغلاق' : 'Close'}
            </button>
          </div>
        </Html>
      )}
    </group>
  )
}

