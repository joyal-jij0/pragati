'use client'

import HeroSection from '@/components/HeroSection'

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-2 py-2">
      <HeroSection
        title="Dashboard"
        secondaryTitle="Management Hub"
        info="Centralized management hub for monitoring activities, organizing resources, enhancing market strategies with actionable insights."
        badges={[
          'Actionable Insights',
          'Centralized Monitoring',
          'Enhanced Collaboration',
        ]}
      />
    </div>
  )
}
