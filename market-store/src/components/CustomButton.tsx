import { type ComponentPropsWithRef } from 'react'

const CustomButton = ({children, ref, ...rest}: ComponentPropsWithRef<'button'>) => {
  return (
    <button ref={ref} {...rest}>
      {children}
    </button>
  )
}

export default CustomButton
