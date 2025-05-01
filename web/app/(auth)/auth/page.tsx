import { LoginForm } from '@/components/login-form'
import { TreePalmIcon } from 'lucide-react'

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10  bg-muted">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-green-500 flex h-7 w-7 items-center justify-center rounded-md text-primary-foreground">
            <TreePalmIcon className="size-5" />
          </div>
          Krishi Sahayak.
        </a>
        <LoginForm />
      </div>
    </div>
  )
}
