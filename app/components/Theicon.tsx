import React from 'react'

const Theicon = ({ className, children}: {className?: string, children?: React.ReactNode}) => {
  return (
    <div
      className={`
        flex items-center justify-center
        w-[400px] h-[160px]
        rounded-xl
        border border-[#1e293b]
        bg-gradient-to-br from-[#0f172a] to-[#020617]
        shadow-xl shadow-black/40
        text-[#22c55e]
        transition-all duration-300
        hover:shadow-green-500/30 hover:scale-105
        ${className}
      `}
    >
      {children}
    </div>
  )
}

export default Theicon