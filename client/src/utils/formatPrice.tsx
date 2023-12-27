const formatPrice = (priceInSek: number) => {
  return (priceInSek / 100).toFixed(2) + ' kr'
}

export default formatPrice
