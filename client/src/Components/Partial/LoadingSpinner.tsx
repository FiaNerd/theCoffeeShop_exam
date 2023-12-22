import { useIsFetching } from '@tanstack/react-query'
import { DotLoader } from 'react-spinners'

const LoadingSpinner = () => {
  const isFetching = useIsFetching()

  return isFetching ? (
    <div>
      <DotLoader color='#42201a' size={300} />
    </div>
  ) : null
}

export default LoadingSpinner
