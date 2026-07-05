type CustomButtonType = {
  children: React.ReactNode
} & Omit<React.ComponentProps<'button'>, 'children'>

const CustomButton = ({children, ...rest}: CustomButtonType) => {
  return (
    <button {...rest}>
      {children}
    </button>
  )
}

export default CustomButton
