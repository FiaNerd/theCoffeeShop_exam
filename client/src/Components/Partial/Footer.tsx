const Footer = () => {
  return (
    <div className='mt-auto text-white bg-deep-red text-center'>
      <ul className='flex justify-center gap-4 py-2'>
        <li>Om oss</li>
        <li>Kontakta oss</li>
      </ul>

      <div className=' divide-slate-600'>
        <p className='text-white py-2 border-t'>
          &copy; 2023 | Kaffebönans skafferi
        </p>
      </div>
    </div>
  )
}

export default Footer
