import useBaskets from '../hooks/useBaskets'

const Basket = () => {
  const { data: baskets } = useBaskets()

  return (
    <div>
      {baskets &&
        baskets!.map((items: any) => <p key={items.proudctId}>{items.name}</p>)}
    </div>
  )
}

export default Basket
