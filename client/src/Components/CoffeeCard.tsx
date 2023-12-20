import useProducts from '../hooks/useProducts'

const CoffeeCard = () => {
  const { data: coffeeProducts } = useProducts()

  if (!coffeeProducts) {
    return null
  }

  return (
    <div>
      {coffeeProducts.map((product) => (
        <div key={product.guid}>
          <h3>{product.name}</h3>
          <p>{product.roastLevel.toString()}</p>
        </div>
      ))}
    </div>
  )
}

export default CoffeeCard
