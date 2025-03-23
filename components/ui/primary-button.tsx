import React from 'react'

type Props = {
    variant?:'yellow' | 'orange'
} & React.ButtonHTMLAttributes<HTMLButtonElement>
const PrimaryBtn = ({className,children,...props}:Props) => {
  return (
    <button {...props} className={'bg-orange rounded-md px-4 py-2 text-white hover:opacity-85' + className}>
        {children}
    </button>
  )
}

export default PrimaryBtn