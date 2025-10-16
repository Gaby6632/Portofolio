import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei'
import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Group } from 'three'
import * as THREE from 'three'
import heroImage from '@/assets/hero-3d-image.jpg'

function AbstractRubikCube() {
  const groupRef = useRef<Group>(null)
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 })
  
  const cubeColors = ['#a855f7', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']
  
  const handleCubeClick = (face: string) => {
    setRotation(prev => {
      switch(face) {
        case 'front': return { ...prev, x: prev.x + Math.PI / 2 }
        case 'back': return { ...prev, x: prev.x - Math.PI / 2 }
        case 'left': return { ...prev, y: prev.y + Math.PI / 2 }
        case 'right': return { ...prev, y: prev.y - Math.PI / 2 }
        case 'top': return { ...prev, z: prev.z + Math.PI / 2 }
        case 'bottom': return { ...prev, z: prev.z - Math.PI / 2 }
        default: return prev
      }
    })
  }
  
  return (
    <group 
      ref={groupRef} 
      rotation={[rotation.x, rotation.y, rotation.z]}
    >
      {/* Create interactive 3x3x3 Rubik cube */}
      {Array.from({ length: 27 }, (_, i) => {
        const x = (i % 3) - 1
        const y = Math.floor((i % 9) / 3) - 1
        const z = Math.floor(i / 9) - 1
        
        // Skip center cube for hollow effect
        if (x === 0 && y === 0 && z === 0) return null
        
        // Determine which face this cube belongs to for click handling
        let face = 'middle'
        if (z === 1) face = 'front'
        else if (z === -1) face = 'back'
        else if (x === 1) face = 'right'
        else if (x === -1) face = 'left'
        else if (y === 1) face = 'top'
        else if (y === -1) face = 'bottom'
        
        return (
          <mesh
            key={i}
            position={[x * 1.1, y * 1.1, z * 1.1]}
            castShadow
            receiveShadow
            onClick={() => handleCubeClick(face)}
            onPointerEnter={(e) => {
              e.stopPropagation()
              document.body.style.cursor = 'pointer'
            }}
            onPointerLeave={(e) => {
              e.stopPropagation()
              document.body.style.cursor = 'auto'
            }}
          >
            <boxGeometry args={[0.95, 0.95, 0.95]} />
            <meshStandardMaterial
              color={cubeColors[i % cubeColors.length]}
              metalness={0.7}
              roughness={0.3}
              transparent
              opacity={0.9}
              emissive={cubeColors[i % cubeColors.length]}
              emissiveIntensity={0.1}
            />
            {/* Add edges for more realistic look */}
            <lineSegments>
              <edgesGeometry args={[new THREE.BoxGeometry(0.95, 0.95, 0.95)]} />
              <lineBasicMaterial color="#000000" linewidth={2} />
            </lineSegments>
          </mesh>
        )
      })}
    </group>
  )
}

export default function Interactive3DCard() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div 
      className="relative w-full h-96 glass rounded-2xl overflow-hidden group cursor-pointer"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20" />
      
      {/* 3D Canvas */}
      <Canvas className="absolute inset-0 z-10">
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <OrbitControls 
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          autoRotate={!isHovered}
          autoRotateSpeed={1}
          minDistance={4}
          maxDistance={12}
          zoomSpeed={0.5}
          panSpeed={0.5}
          rotateSpeed={0.8}
        />
        <Environment preset="city" />
        
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#a855f7" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#06b6d4" />
        
        {/* 3D Objects */}
        <group>
          <AbstractRubikCube />
          
          {/* Floating geometric shapes */}
          <mesh position={[3, 2, 1]} rotation={[0.5, 0.5, 0]}>
            <octahedronGeometry args={[0.4]} />
            <meshStandardMaterial 
              color="#a855f7" 
              metalness={0.9} 
              roughness={0.1}
              emissive="#a855f7"
              emissiveIntensity={0.3}
            />
          </mesh>
          
          <mesh position={[-3, -1, 2]} rotation={[1, 0, 0.5]}>
            <tetrahedronGeometry args={[0.5]} />
            <meshStandardMaterial 
              color="#06b6d4" 
              metalness={0.8} 
              roughness={0.2}
              emissive="#06b6d4"
              emissiveIntensity={0.2}
            />
          </mesh>
          
          {/* Animated rings */}
          <mesh rotation={[0.5, 0, 0]} position={[0, 0, 0]}>
            <ringGeometry args={[3.5, 3.8, 64]} />
            <meshStandardMaterial 
              color="#8b5cf6" 
              metalness={1} 
              roughness={0}
              transparent
              opacity={0.4}
              side={2}
            />
          </mesh>
          
          <mesh rotation={[0, 0.5, 0.5]} position={[0, 0, 0]}>
            <ringGeometry args={[3, 3.3, 64]} />
            <meshStandardMaterial 
              color="#10b981" 
              metalness={1} 
              roughness={0}
              transparent
              opacity={0.3}
              side={2}
            />
          </mesh>
        </group>
      </Canvas>
      
      {/* Content Overlay */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end p-8">
        <motion.h3 
          className="text-2xl font-bold text-glow mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Interactive 3D Experience
        </motion.h3>
        <motion.p 
          className="text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
        </motion.p>
      </div>

      {/* Glow effect */}
      <div className="absolute inset-0 rounded-2xl glow-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  )
}