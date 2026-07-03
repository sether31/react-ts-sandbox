
type CustomButtonProps = {
  children: string,
  variant: 'primary' | 'secondary' | 'danger'
} & Omit<React.ComponentProps<'button'>, 'children'>

const CustomButton = ({children, variant, ...rest}: CustomButtonProps) => {
  return (
    <button className={`class-with-${variant}`} {...rest}>
      {children}
    </button>
  )
}

export default CustomButton
