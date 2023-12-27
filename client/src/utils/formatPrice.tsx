const formatPrice = (priceInSek: number) => {
  return (priceInSek / 100).toFixed(2) + ' SEK';
}

export default formatPrice