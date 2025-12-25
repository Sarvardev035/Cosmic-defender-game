import React from 'react'
import { EffectComposer, Bloom, Vignette, ToneMapping } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'

export default function PostFX() {
  return (
    <EffectComposer>
      <Bloom
        intensity={0.6}
        kernelSize={3}
        luminanceThreshold={0.2}
        luminanceSmoothing={0.025}
      />
      <Vignette darkness={0.65} />
      <ToneMapping />
    </EffectComposer>
  )
}
