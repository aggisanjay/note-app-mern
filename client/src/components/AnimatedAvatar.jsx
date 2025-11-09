import { Avatar, AvatarFallback } from '@/components/ui/avatar'

export default function AnimatedAvatar({ name }) {
  const initials = name ? name.split(' ').map(w => w[0]).join('').toUpperCase() : 'U'
  return (
    <Avatar className="h-10 w-10 rounded-full border border-transparent transition-all duration-300 hover:border-blue-400 hover:shadow-[0_0_0_4px_rgba(59,130,246,0.15)] hover:scale-105 bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
      <AvatarFallback className="text-blue-700 font-semibold bg-transparent">
        {initials}
      </AvatarFallback>
    </Avatar>
  )
}
