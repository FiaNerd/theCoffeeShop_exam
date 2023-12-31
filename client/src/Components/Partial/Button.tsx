import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'

interface IProps {
  buttonType: 'create' | 'read-more' | 'search' | 'checkout' | 'back'
  typeAction: 'button' | 'submit'
  iconType?: 'increase' | 'decrease' | 'cart' | 'arrow'
  children?: React.ReactNode
  buttonText?: React.ReactNode
  className?: string
  onClick?: () => void
  disabled?: boolean
}

const Buttons: React.FC<IProps> = ({
  buttonType,
  iconType,
  className,
  children,
  buttonText,
  onClick,
  typeAction,
  disabled,
}: IProps) => {
  const buttonClasses = (variant: string) => {
    switch (variant) {
      case 'create':
        return clsx(
          'py-3',
          'flex items-normal justify-center gap-4',
          'text-white bg-orange rounded'
        )

      case 'read-more':
        return clsx(
          'w-full',
          'text-center text-dark-deep-brown',
          'border-orange border-2 rounded'
        )

      case 'checkout':
        return clsx(
          'w-full flex items-center justify-center',
          'text-center text-white bg-orange'
        )

      case 'back':
        return clsx(
          'flex flex-rows gap-2',
          'items-center text-center text-dark-deep-brown hover:text-orange'
        )

      case 'search':
        return clsx(
          'ml-2 px-6 py-2',
          'cursor-pointer text-white hover:border-white ',
          'font-bold bg-orange rounded'
        )

      default:
        return ''
    }
  }

  const renderIcon = () => {
    switch (iconType) {
      case 'increase':
        return <FontAwesomeIcon icon={faPlus} />
      case 'decrease':
        return <FontAwesomeIcon icon={faMinus} />
      case 'cart':
        return (
          <svg width='22' height='20' xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z'
              fill='#e2d6cc'
            />
          </svg>
        )
      case 'arrow':
        return (
          <FontAwesomeIcon
            icon={faArrowLeft}
            className='text-dark-deep-brown hover:text-orange'
          />
        )
      default:
        return null
    }
  }

  return (
    <button
      className={clsx(
        'py-3 ',
        'font-bold uppercase',
        'hover:opacity-80 cursor-pointer',
        buttonClasses(buttonType),
        className
      )}
      type={typeAction as 'button' | 'submit'}
      onClick={onClick}
      disabled={disabled}>
      {renderIcon()}
      {buttonText || children || ''}
    </button>
  )
}

export default Buttons
