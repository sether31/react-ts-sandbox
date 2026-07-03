type CustomOwnTextProps<E extends React.ElementType> = {
  size: 'sm' | 'md' | 'lg'
  color: string
  children: React.ReactNode
  as?: E
}

type CustomTextProps<E extends React.ElementType> = CustomOwnTextProps<E> & Omit<React.ComponentProps<E>, keyof CustomOwnTextProps<E>>

const CustomText = <E extends React.ElementType = 'p'>({size, color, children, as, ...rest}: CustomTextProps<E>) => {
  const Component = as || 'p';

  return (
    <Component className={`class-with-${size}-${color}`} {...rest}>
      {children}
    </Component>
  )
}

export default CustomText
