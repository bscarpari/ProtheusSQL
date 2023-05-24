import { Card_ } from './style'

const Card = ({ children, columnTitle }) => {
  return (
    <>
      <Card_
        className={
          columnTitle === 'A fazer'
            ? 'border-primary'
            : columnTitle === 'Em andamento'
            ? 'border-orange-400'
            : 'border-green-300'
        }
      >
        {children}
      </Card_>
    </>
  )
}

export default Card
