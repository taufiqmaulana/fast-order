import { PlusCircleIcon } from "lucide-react";

export const MenuItem = ({ menu, onClick }) => {
  const handleOnClick = () => {
    setThrowing(true)
    setTimeout(() => setThrowing(false), 1000)
    onClick(menu)
  }
  if (!menu) return "";
  return (
    <div
      className="flex p-4 rounded-lg cursor-pointer shadow hover:shadow-xl transition-shadow duration-300"
    >
      <img className="w-32 h-32 object-cover rounded-lg" src={menu.Thumb} />
      <div className="ml-4 flex flex-col justify-between grow">
        <div>
          <h4 className="font-bold text-green-600">{menu.Menu}</h4>
          <p className="text-slate-500 text-sm">{menu.Description}</p>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col justify-between">
            <div className="rating">
              <div
                className="mask mask-star-2 bg-orange-400"
                aria-label="1 star"
                aria-current={menu.Rating === 1}
              ></div>
              <div
                className="mask mask-star-2 bg-orange-400"
                aria-label="2 star"
                aria-current={menu.Rating === 2}
              ></div>
              <div
                className="mask mask-star-2 bg-orange-400"
                aria-label="3 star"
                aria-current={menu.Rating === 3}
              ></div>
              <div
                className="mask mask-star-2 bg-orange-400"
                aria-label="4 star"
                aria-current={menu.Rating === 4}
              ></div>
              <div
                className="mask mask-star-2 bg-orange-400"
                aria-label="5 star"
                aria-current={menu.Rating === 5}
              ></div>
            </div>
            <div><small className="text-slate-500 mr-1">Rp</small><span className="text-lg font-semibold text-slate-600">{menu.Price / 1000}k</span></div>
          </div>
          <button
            onClick={handleOnClick}
            className="btn btn-lg rounded-r-full rounded-l-full bg-green-500 text-white mt-4"
          >
            Add <PlusCircleIcon />
          </button>
        </div>
      </div>
    </div>
  )
}
