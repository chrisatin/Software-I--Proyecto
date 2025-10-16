import { Suspense, useRef, useState } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls, Environment, Html, useProgress } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Box, MapPin, RotateCcw, Maximize2, Minimize2 } from 'lucide-react'

// Loading component
function Loader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Cargando modelo 3D... {Math.round(progress)}%</p>
      </div>
    </Html>
  )
}

// 3D Model component
function Model({ url, onLoad }) {
  const modelRef = useRef()
  const [loaded, setLoaded] = useState(false)

  const gltf = useLoader(GLTFLoader, url, (loader) => {
    loader.load(url, (gltf) => {
      setLoaded(true)
      onLoad && onLoad(gltf)
    })
  })

  useFrame(() => {
    if (modelRef.current) {
      // Add subtle rotation animation
      modelRef.current.rotation.y += 0.001
    }
  })

  return (
    <primitive 
      ref={modelRef} 
      object={gltf.scene} 
      scale={[1, 1, 1]} 
      position={[0, 0, 0]}
    />
  )
}

// Navigation controls
function NavigationControls({ onReset, onFullscreen, isFullscreen }) {
  return (
    <div className="absolute top-4 right-4 z-10 flex flex-col space-y-2">
      <button
        onClick={onReset}
        className="bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg hover:bg-white transition-colors"
        title="Resetear vista"
      >
        <RotateCcw className="w-5 h-5 text-gray-700" />
      </button>
      <button
        onClick={onFullscreen}
        className="bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg hover:bg-white transition-colors"
        title={isFullscreen ? "Salir de pantalla completa" : "Pantalla completa"}
      >
        {isFullscreen ? <Minimize2 className="w-5 h-5 text-gray-700" /> : <Maximize2 className="w-5 h-5 text-gray-700" />}
      </button>
    </div>
  )
}

// Instructions overlay
function Instructions() {
  return (
    <div className="absolute bottom-4 left-4 z-10 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg max-w-sm">
      <h3 className="font-semibold text-gray-900 mb-2">Controles de Navegación</h3>
      <ul className="text-sm text-gray-600 space-y-1">
        <li>• <strong>Ratón:</strong> Rotar vista</li>
        <li>• <strong>Rueda:</strong> Zoom in/out</li>
        <li>• <strong>Click + arrastrar:</strong> Mover cámara</li>
        <li>• <strong>Doble click:</strong> Centrar en objeto</li>
      </ul>
    </div>
  )
}

// Main Virtual Tour component
const VirtualTour = ({ modelUrl, propertyTitle, onClose }) => {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [modelLoaded, setModelLoaded] = useState(false)

  const handleReset = () => {
    // Reset camera position - this would need to be implemented with camera controls
    window.location.reload() // Simple reset for now
  }

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const handleModelLoad = (gltf) => {
    setModelLoaded(true)
    console.log('Model loaded:', gltf)
  }

  return (
    <div className={`fixed inset-0 z-50 bg-black ${isFullscreen ? 'fullscreen' : ''}`}>
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-white/90 backdrop-blur-sm border-b border-gray-200">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <Box className="w-6 h-6 text-primary-600" />
            <div>
              <h2 className="text-lg font-semibold text-gray-900">{propertyTitle}</h2>
              <p className="text-sm text-gray-600">Recorrido Virtual 3D</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* 3D Canvas */}
      <div className="absolute top-16 bottom-0 left-0 right-0">
        <Canvas
          camera={{ position: [5, 5, 5], fov: 60 }}
          shadows
        >
          <Suspense fallback={<Loader />}>
            {/* Lighting */}
            <ambientLight intensity={0.4} />
            <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
            <pointLight position={[-10, -10, -10]} intensity={0.5} />

            {/* Environment */}
            <Environment preset="sunset" />

            {/* 3D Model */}
            {modelUrl && (
              <Model url={modelUrl} onLoad={handleModelLoad} />
            )}

            {/* Fallback if no model */}
            {!modelUrl && (
              <mesh position={[0, 0, 0]}>
                <boxGeometry args={[2, 2, 2]} />
                <meshStandardMaterial color="#3b82f6" />
              </mesh>
            )}

            {/* Controls */}
            <OrbitControls
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              minDistance={2}
              maxDistance={20}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Navigation Controls */}
      <NavigationControls 
        onReset={handleReset}
        onFullscreen={handleFullscreen}
        isFullscreen={isFullscreen}
      />

      {/* Instructions */}
      <Instructions />

      {/* Loading overlay */}
      {!modelLoaded && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-lg">Preparando recorrido virtual...</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default VirtualTour
