
import { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Html, Line } from '@react-three/drei'
import { useTranslation } from 'react-i18next'

import { useTheme } from '../../context/ThemeContext'
import Buildings from './Buildings'
import Roads from './Roads'
import ExcavationSite from './ExcavationSite'
import CameraController from './CameraController'

const points = [
  {
    id: 'contractor',
    position: [-8.5, 9.2, -5.1],
    color: '#DDBB79',
    ar: {
      title: 'المقاول الميداني',
      description: 'توثيق الأعمال والصور والموقع الجغرافي وإرفاق التصاريح من التطبيق الميداني.'
    },
    en: {
      title: 'Field Contractor',
      description: 'Capture field photos, coordinates, work progress, and permit attachments.'
    }
  },
  {
    id: 'ai',
    position: [5.1, 12.2, -5.1],
    color: '#8BE5BE',
    ar: {
      title: 'التحقق الذكي',
      description: 'استخدام الذكاء الاصطناعي لتحليل الصور ودعم مطابقة التوثيق مع بيانات الموقع.'
    },
    en: {
      title: 'AI Verification',
      description: 'Use AI to analyze field images and support documentation verification.'
    }
  },
  {
    id: 'authority',
    position: [-5.1, 13.2, 5.1],
    color: '#8CBFE3',
    ar: {
      title: 'الجهة المشرفة',
      description: 'متابعة المشاريع والمقاولين ومواقع التنفيذ من لوحة تحكم جغرافية موحدة.'
    },
    en: {
      title: 'Supervising Authority',
      description: 'Monitor projects, contractors, and field locations through one geospatial dashboard.'
    }
  },
  {
    id: 'municipality',
    position: [8.5, 10.2, 5.1],
    color: '#E8C68C',
    ar: {
      title: 'البلدية',
      description: 'الاستعلام عن الأعمال في موقع البلاغ وتحديد المقاول المرتبط بالموقع.'
    },
    en: {
      title: 'Municipality',
      description: 'Investigate reported locations and identify the associated contractor.'
    }
  }
]

function GISPoint({ point, language, selected, onSelect }) {
  const active = selected === point.id
  const content = point[language]

  return (
    <group>
      <mesh position={point.position}>
        <sphereGeometry args={[active ? 0.22 : 0.15, 16, 16]} />
        <meshBasicMaterial color={point.color} />
      </mesh>

      <mesh
        position={point.position}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <ringGeometry args={[0.3, 0.39, 32]} />
        <meshBasicMaterial
          color={point.color}
          transparent
          opacity={active ? 0.95 : 0.6}
          side={2}
          depthWrite={false}
        />
      </mesh>

      <Html
        position={[
          point.position[0],
          point.position[1] + 0.8,
          point.position[2]
        ]}
        center
        distanceFactor={16}
      >
        <button
          type="button"
          onClick={() => onSelect(active ? null : point.id)}
          style={{
            background: active ? '#A9D9BE' : '#102F29',
            color: active ? '#102F29' : '#EAF6EC',
            border: `1px solid ${point.color}`,
            borderRadius: 30,
            padding: '8px 13px',
            fontSize: 11,
            fontWeight: 600,
            whiteSpace: 'nowrap',
            cursor: 'pointer',
            boxShadow: '0 8px 25px #0006'
          }}
        >
          {content.title} +
        </button>
      </Html>

      {active && (
        <Html
          position={[
            point.position[0],
            point.position[1] + 3.4,
            point.position[2]
          ]}
          center
          distanceFactor={13}
        >
          <div
            dir={language === 'ar' ? 'rtl' : 'ltr'}
            style={{
              width: 235,
              background: '#102B25',
              color: '#F4F1E8',
              border: `1px solid ${point.color}`,
              borderRadius: 16,
              padding: 17,
              boxShadow: '0 20px 55px #0009',
              fontFamily: 'inherit'
            }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 12
            }}>
              <strong style={{ fontSize: 13 }}>
                {content.title}
              </strong>

              <button
                type="button"
                onClick={() => onSelect(null)}
                aria-label="Close"
                style={{
                  border: 0,
                  background: 'transparent',
                  color: '#A9D9BE',
                  cursor: 'pointer',
                  fontSize: 19
                }}
              >
                ×
              </button>
            </div>

            <p style={{
              fontSize: 12,
              lineHeight: 1.9,
              marginTop: 10
            }}>
              {content.description}
            </p>

            <small style={{
              color: '#9ECDB6',
              fontSize: 10
            }}>
              {language === 'ar'
                ? 'عرض توضيحي للمنصة'
                : 'Platform concept demonstration'}
            </small>
          </div>
        </Html>
      )}
    </group>
  )
}

function GISNetwork({ language }) {
  const [selected, setSelected] = useState(null)

  const connections = [
    [0, 1],
    [1, 2],
    [2, 3],
    [0, 3]
  ]

  return (
    <group>
      {connections.map(([from, to], index) => (
        <Line
          key={index}
          points={[
            points[from].position,
            points[to].position
          ]}
          color="#80DDB4"
          lineWidth={1.3}
          transparent
          opacity={0.4}
          depthWrite={false}
        />
      ))}

      {points.map(point => (
        <GISPoint
          key={point.id}
          point={point}
          language={language}
          selected={selected}
          onSelect={setSelected}
        />
      ))}
    </group>
  )
}

function Scene({ dark, language }) {
  return (
    <>
      <color
        attach="background"
        args={[dark ? '#091D1B' : '#E7EFE7']}
      />

      <ambientLight intensity={dark ? 1.2 : 1.8} />

      <hemisphereLight
        args={[
          dark ? '#A9D9BE' : '#FFFFFF',
          '#315746',
          dark ? 1.4 : 1.8
        ]}
      />

      <directionalLight
        position={[12, 22, 10]}
        intensity={dark ? 3 : 3.5}
        color="#FFF0D8"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-16}
        shadow-camera-right={16}
        shadow-camera-top={16}
        shadow-camera-bottom={-16}
        shadow-camera-near={1}
        shadow-camera-far={55}
      />

      <pointLight
        position={[-7, 12, -5]}
        color="#79DDB4"
        intensity={dark ? 25 : 10}
        distance={25}
      />

      <pointLight
        position={[7, 12, 6]}
        color="#E3BF82"
        intensity={dark ? 20 : 8}
        distance={25}
      />

      <Roads dark={dark} />
      <Buildings dark={dark} />
      <ExcavationSite
        dark={dark}
        language={language}
      />
      <GISNetwork language={language} />
      <CameraController />
    </>
  )
}

export default function SmartCity() {
  const { theme } = useTheme()
  const { i18n } = useTranslation()

  const dark = theme === 'dark'
  const language = i18n.language.startsWith('ar')
    ? 'ar'
    : 'en'

  return (
    <Canvas
      shadows
      dpr={[1, 1.5]}
      camera={{
        position: [25, 24, 25],
        fov: 42,
        near: 0.1,
        far: 120
      }}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance'
      }}
      style={{
        width: '100%',
        height: '100%',
        display: 'block'
      }}
    >
      <Suspense fallback={null}>
        <Scene
          dark={dark}
          language={language}
        />
      </Suspense>
    </Canvas>
  )
}
