 interface WaveDividerProps {
  color?: 'teal' | 'amber' | 'green'
  className?: string
}

export default function WaveDivider({ color = 'teal', className = '' }: WaveDividerProps) {
  const colorMap = {
    teal: '#1B8B8B',
    amber: '#B8860B',
    green: '#10B981',
  }

  return (
    <div className={`wave-divider ${className}`}>
      <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className={`wave-${color}`}>
        <path d="M0,40 Q300,0 600,40 T1200,40 L1200,120 L0,120 Z"></path>
      </svg>
    </div>
  )
}
