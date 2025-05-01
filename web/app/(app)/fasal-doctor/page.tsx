'use client'

import HeroSection from '@/components/HeroSection'

export default function FasalDoctorPage() {
  return (
    <div className="container mx-auto px-2 py-2">
      <HeroSection
        title="Fasal Doctor"
        secondaryTitle="AI"
        info="Your intelligent assistant for crop health monitoring, disease identification, and treatment recommendations"
        badges={['95% Accuracy', '100+ Diseases', '50+ Crops']}
      />
    </div>
  )
}
