import { FC } from 'react'
import { motion } from 'motion/react'
import { CheckCircle2Icon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface HeroSectionProps {
  title: string
  secondaryTitle?: string
  info: string
  badges?: string[]
  floatingIcon?: string
}

const HeroSection: FC<HeroSectionProps> = ({
  title,
  secondaryTitle,
  info,
  badges,
  floatingIcon = '🌱',
}) => {
  return (
    <motion.div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-green-600 to-green-500 text-white">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/20"></div>
        <div className="absolute -left-20 -bottom-20 h-80 w-80 rounded-full bg-white/20"></div>
        <div className="grid grid-cols-10 grid-rows-10 gap-1 h-full w-full">
          {Array.from({ length: 100 }).map((_, i) => (
            <div key={i} className="bg-white/5 rounded-sm"></div>
          ))}
        </div>
      </div>

      <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-center">
        <div className="md:w-2/3 mb-8 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {title}{' '}
            {secondaryTitle && (
              <span className="text-green-200">{secondaryTitle}</span>
            )}
          </h1>
          <p className="text-xl text-green-100 mb-6 max-w-2xl">{info}</p>
          {badges && (
            <div className="flex flex-wrap gap-3 mb-6">
              {badges.map((badge) => (
                <Badge
                  key={badge}
                  className="bg-white/20 border-none text-white px-3 py-1 text-sm"
                >
                  <CheckCircle2Icon className="h-4 w-4 mr-1" />
                  <span>{badge}</span>
                </Badge>
              ))}
            </div>
          )}
          {/* <div className="flex flex-wrap gap-4">
            <Button
              size="lg"
              className="bg-white text-green-700 hover:bg-green-100"
            >
              <CameraIcon className="h-5 w-5 mr-2" />
              <span>Scan Crop Now</span>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white text-green-700 hover:bg-green-100"
            >
              <InfoIcon className="h-5 w-5 mr-2" />
              <span>How It Works</span>
            </Button>
          </div> */}
        </div>

        <div className="md:w-1/3 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-white rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute inset-4 bg-white rounded-full opacity-30"></div>
            <div className="absolute inset-8 bg-white rounded-full opacity-40"></div>
            <div className="relative h-48 w-48 flex items-center justify-center">
              <motion.div
                animate={{
                  rotate: [0, 5, 0, -5, 0],
                  y: [0, -5, 0, 5, 0],
                }}
                transition={{ duration: 5, repeat: Infinity }}
                className="text-7xl"
              >
                {floatingIcon}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default HeroSection
