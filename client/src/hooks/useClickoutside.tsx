import { useEffect } from 'react'

interface IProps {
  ref: React.RefObject<HTMLElement | null>
  callback: (event: MouseEvent) => void
}

const useClickOutside = ({ ref, callback }: IProps) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback(event)
      }
    }

    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [ref, callback])
}

export default useClickOutside
