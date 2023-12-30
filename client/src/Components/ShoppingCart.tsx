import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import Button from './Partial/Button'
import { NavLink } from 'react-router-dom'
import { formatPrice } from '../utils/formatPrice'
import { useStoreContext } from '../context/StoreProvider'
import useBasket from '../hooks/useBasket'

const ShoppingCart = () => {
  const [open, setOpen] = useState(true)

  const { basket } = useStoreContext()
  const { data: basketItem } = useBasket()

  const { setBasket, addToBasket, updateQuantity, removeItem } =
    useStoreContext()

  const handleAddItem = (productId: string) => {
    addToBasket(productId)
  }

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    updateQuantity(productId, newQuantity)
  }

  const handleRemoveItem = (productId: string) => {
    const item = basket?.items.find((item) => item.productId === productId)

    if (item && item.quantity > 0) {
      removeItem(productId, 1)
    }
  }

  if (!basketItem) {
    return null
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter='ease-in-out duration-500'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in-out duration-500'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'>
          <div className='fixed inset-0 mt-[7.75em] bg-gray-500 bg-opacity-75 transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-hidden  mt-[7.75em]'>
          <div className='absolute inset-0 overflow-hidden  mt-[7.75em]'>
            <div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10'>
              <Transition.Child
                as={Fragment}
                enter='transform transition ease-in-out duration-500 sm:duration-700'
                enterFrom='translate-x-full'
                enterTo='translate-x-0'
                leave='transform transition ease-in-out duration-500 sm:duration-700'
                leaveFrom='translate-x-0'
                leaveTo='translate-x-full'>
                <Dialog.Panel className='pointer-events-auto mt-[7.75em] w-screen max-w-md'>
                  <div className='flex h-full flex-col overflow-y-scroll bg-white shadow-xl'>
                    <div className='flex-1 overflow-y-auto px-4 py-6 sm:px-6'>
                      <div className='flex items-start justify-between'>
                        <Dialog.Title className='text-heading uppercase font-medium '>
                          Din varukorg -
                        </Dialog.Title>
                        <div className='ml-3 flex h-7 items-center'>
                          <button
                            type='button'
                            className='relative -m-2 p-2 hover:opacity-80'
                            onClick={() => setOpen(false)}>
                            <span className='absolute -inset-0.5' />
                            <span className='sr-only'>Close panel</span>
                            <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                          </button>
                        </div>
                      </div>

                      <div className='mt-8'>
                        <div className='flow-root'>
                          <ul
                            role='list'
                            className='-my-6 divide-y divide-gray-200'>
                            {basket?.items.map((item) => (
                              <li key={item.productId} className='flex py-6'>
                                <div className='h-auto w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200'>
                                  <img
                                    src={item.imageUrl}
                                    alt={item.name}
                                    className='h-full w-full object-cover object-center'
                                  />
                                </div>

                                <div className='ml-4 flex flex-1 flex-col'>
                                  <div>
                                    <div className='flex justify-between text-base font-medium text-gray-900'>
                                      <h3>
                                        <NavLink
                                          to='#'
                                          className='font-bold uppercase hover:-text-orange'>
                                          {item.name}
                                        </NavLink>
                                      </h3>
                                      <p className='ml-4'>
                                        {formatPrice(item.price)}
                                      </p>
                                    </div>
                                    <p className='mb-2 text-sm text-gray-500'>
                                      {item.roastLevel}
                                    </p>
                                  </div>

                                  <div className='flex flex-row flex-1 items-end text-sm'>
                                    <div className='flex flex-row h-auto w-full mb-4 rounded-lg justify-between relative bg-transparent mt-1'>
                                      <div className='flex flex-row w-20 md:w-32'>
                                        <button
                                          className='bg-deep-red text-white w-20 hover:opacity-80 h-full rounded-l cursor-pointer outline-none'
                                          onClick={() =>
                                            handleRemoveItem(
                                              item.productId,
                                              item.quantity
                                            )
                                          }>
                                          <span className='m-auto text-2xl font-thin'>
                                            −
                                          </span>
                                        </button>
                                        <input
                                          type='number'
                                          className='focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black md:text-base cursor-default flex items-center text-gray-700 outline-none'
                                          value={item.quantity ?? 0}
                                          onChange={(e) =>
                                            handleQuantityChange(
                                              item?.productId,
                                              parseInt(e.target.value)
                                            )
                                          }
                                        />
                                        <button
                                          data-action='increment'
                                          className='bg-deep-red text-white w-20 hover:opacity-80 rounded-r cursor-pointer'
                                          onClick={() =>
                                            handleAddItem(item.productId)
                                          }>
                                          <span className='m-auto text-2xl font-thin'>
                                            +
                                          </span>
                                        </button>
                                      </div>

                                      <div className='flex justify-between mt-2 md:ml-2'>
                                        <button
                                          type='button'
                                          className='font-bold text-deep-brown hover:opacity-80'>
                                          Ta bort
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                  <div className='text-end font-bold'>
                                    {' '}
                                    <p>
                                      {item.quantity} antal{' '}
                                      {formatPrice(item.price * item.quantity)}
                                    </p>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className='border-t border-gray-200 px-4 py-6 sm:px-6'>
                      <div className='flex justify-between text-base font-medium text-gray-900'>
                        <p>Totalt</p>
                        <p>245 SEK</p>
                      </div>
                      <p className='mt-0.5 text-sm text-gray-500'>
                        Frakt and taxa beräknas i kassan.
                      </p>
                      <div className='mt-6'>
                        <Button
                          buttonType='checkout'
                          typeAction='button'
                          className=''>
                          Till Kassan
                        </Button>
                      </div>
                      <div className='mt-6 flex justify-center text-center text-sm text-gray-500'>
                        <p>
                          Eller {''}
                          <button
                            type='button'
                            className='font-bold text-deep-brown hover:opacity-80'
                            onClick={() => setOpen(false)}>
                            Fortsätta shoppa
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default ShoppingCart
