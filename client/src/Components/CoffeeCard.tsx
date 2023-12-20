import { useProducts } from "../hooks/useProducts"


const CoffeCard = () => {
  const { data: coffeeProducts } = useProducts()


  if(!coffeeProducts){
    return null
  }

 return(
  <>
  {/* { coffeeProducts && coffeeProducts.length > 0 && (
        <p>{coffeeProducts?.map((products) => products.Name)}</p>
  )} */}
  </>
 )
}

export default CoffeCard