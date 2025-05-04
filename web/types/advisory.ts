export interface Advisory {
  id: number
  title: string
  description: string
  translation: string
  icon: string
  color: string
  timestamp: string
  severity: 'high' | 'medium' | 'low'
  actionRequired?: string
  source?: string
}
