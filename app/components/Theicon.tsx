import React from 'react'

const Theicon = ({ className, children}: {className?: string, children?: React.ReactNode}) => {
  return (
    <div className = {`text-[#3aab40] bg-input/30 w-[400px] h-50 border-[4px] border-background py-6 px-5 rounded-[22px] shadow-200 hover:border-input/30 transition-all duration-500 hover:shadow-300 hover:bg-primary-100 ${className}`}>
      {children}
    </div>
  )
}

export default Theicon