'use client'

import HeroSection from '@/components/HeroSection'

export default function SamudayShaktiPage() {
  return (
    <div className="container mx-auto px-2 py-2">
      <HeroSection
        title="Samuday Shakti"
        secondaryTitle="FPO"
        info="Efficient FPO management for organizing resources, improving market access, and building networks for mutual growth and success"
        badges={['Resource Management', 'Market Access', 'Community Growth']}
      />
    </div>
  )
}
