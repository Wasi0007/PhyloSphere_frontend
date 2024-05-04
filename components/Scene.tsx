'use client';
import React, { useEffect } from 'react';
import { Canvas } from '@react-three/fiber'
import Model from './Model';
import { Environment } from '@react-three/drei';
import { useTheme } from 'next-themes';

function Scene() {
  const { theme } = useTheme();

  return (
    <Canvas style={{ 
      background : theme === 'dark' ? '0 0% 0%' : '0 0% 100%' 
    }}>
      <Model />
      <directionalLight intensity={4} position={[0, 3, 2]}/>
      <Environment preset="city" />
    </Canvas>
  );
}

export default Scene;
