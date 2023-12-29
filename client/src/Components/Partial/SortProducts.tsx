const SortProducts = () => {
  return (
    <div className="main flex border rounded-full overflow-hidden m-4 select-none">
  <div className="title py-3 my-auto px-5 bg-blue-500 text-white text-sm font-semibold mr-3">Sortera</div>
  <label className="flex radio p-2 cursor-pointer">
    <input className="my-auto transform scale-125" type="radio" name="sfg" />
    <div className="title px-2">Namn a-ö</div>
  </label>

  <label className="flex radio p-2 cursor-pointer">
    <input className="my-auto transform scale-125" type="radio" name="sfg" />
    <div className="title px-2">Namn ö-z</div>
  </label>

  <label className="flex radio p-2 cursor-pointer">
    <input className="my-auto transform scale-125" type="radio" name="sfg" />
    <div className="title px-2">Lägsta pris</div>
  </label>

  <label className="flex radio p-2 cursor-pointer">
    <input className="my-auto transform scale-125" type="radio" name="sfg" />
    <div className="title px-2">Högsta pris</div>
  </label>

  <label className="flex radio p-2 cursor-pointer font-extralight text-xs">
    <input className="my-auto transform scale-125" type="checkbox" name="sfg" checked />
    <div className="title px-2 my-auto">show public</div>
  </label>
</div>
)
}

export default SortProducts