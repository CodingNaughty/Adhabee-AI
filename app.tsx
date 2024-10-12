import React, { useState, useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { Mesh } from 'three'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Brain, Zap, Globe, MessageSquare, Menu, X } from 'lucide-react'
import Image from 'next/image'

function FloatingBrain() {
  const meshRef = useRef<Mesh>(null)
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2
      meshRef.current.rotation.y += delta * 0.3
    }
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="#4F46E5" wireframe />
    </mesh>
  )
}

function ParticleBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute bg-white rounded-full opacity-20"
          style={{
            width: Math.random() * 4 + 1 + 'px',
            height: Math.random() * 4 + 1 + 'px',
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            animation: `float ${Math.random() * 10 + 5}s linear infinite`,
          }}
        />
      ))}
    </div>
  )
}

function AnimatedRobot() {
  return (
    <div className="relative w-24 h-24">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 bg-indigo-500 rounded-full" />
      </div>
      <div className="absolute top-4 left-4 w-4 h-4 bg-white rounded-full animate-blink" />
      <div className="absolute top-4 right-4 w-4 h-4 bg-white rounded-full animate-blink" />
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-white rounded-full animate-talk" />
    </div>
  )
}

export default function App() {
  const [demoText, setDemoText] = useState('')
  const [demoResult, setDemoResult] = useState('')
  const [isNavOpen, setIsNavOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate AI processing
    setTimeout(() => {
      setDemoResult(`Dhivehi translation: ${demoText.split('').reverse().join('')}`)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900 bg-opacity-80 backdrop-blur-sm">
        {/* ... (navbar content) ... */}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden pt-16">
        <ParticleBackground />
        <motion.div 
          className="z-10 text-center flex flex-col items-center"
          style={{ opacity, scale }}
        >
          <Image src="/blacklogo.png" alt="ފަން Logo" width={120} height={120} className="mb-8" />
          <h1 className="text-5xl font-bold mb-4">Welcome to ފަން AI</h1>
          <p className="text-xl mb-8 max-w-2xl">
            Revolutionizing Dhivehi language processing with cutting-edge AI technology. 
            Experience seamless communication and understanding like never before.
          </p>
          <div className="flex items-center space-x-8">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-lg px-6 py-3">Get Started</Button>
            <AnimatedRobot />
          </div>
        </motion.div>
        <div className="absolute inset-0 z-0">
          <Canvas>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <FloatingBrain />
          </Canvas>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        {/* ... (features content) ... */}
      </section>

      {/* Interactive Demo Section */}
      <section id="demo" className="py-20 px-4 bg-gray-800">
        {/* ... (demo content) ... */}
      </section>

      {/* Call-to-Action Section */}
      <section id="contact" className="py-20 px-4 text-center">
        {/* ... (CTA content) ... */}
      </section>

      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes talk {
          0%, 100% { width: 32px; }
          50% { width: 16px; }
        }
        .animate-blink {
          animation: blink 2s infinite;
        }
        .animate-talk {
          animation: talk 0.5s infinite;
        }
      `}</style>
    </div>
  )
}
