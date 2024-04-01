const Footer = () => {
  return (
    <div className='footer text-white inset-0 bg-deep-red w-full text-center flex flex-col justify-between'>
      <ul className='flex justify-center gap-4 py-2'>
        <li>Om oss</li>
        <li>Kontakta oss</li>
      </ul>
      <div className='divide-slate-600'>
        <p className='text-white py-2 border-t'>
          &copy; 2023 | Kaffebönans skafferi
        </p>
      </div>
    </div>
  )
}

export default Footer
