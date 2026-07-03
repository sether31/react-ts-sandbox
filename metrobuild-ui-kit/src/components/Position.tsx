type VerticalPosition = 'center' | 'top' | "bottom"
type HorizontalPosition = 'center' | 'left' | "right"

type PositionProps = {
  position: Exclude<`${VerticalPosition}-${HorizontalPosition}`, 'center-center'> | 'center'
}

const Position = ({position}: PositionProps) => {
  return (
    <div>Position: {position}</div>
  )
}

export default Position
