import { PlusCircleIcon } from "lucide-react";
import { useRef } from "react";
import { useState } from "react";

export const MenuItem = ({ menu, onClick }) => {
  const [throwing, setThrowing] = useState(false);
  const ref = useRef();
  const atcEffect = () => {
    setThrowing(true);
    setTimeout(() => {
      ref.current.classList.add("hidden");
      setThrowing(false);
      setTimeout(() => {
        ref.current.classList.remove("hidden");
      }, 100);
    }, 500);
  };
  const handleOnClick = () => {
    atcEffect();
    onClick(menu);
  };
  if (!menu) return "";
  return (
    <div className="flex p-2 rounded-lg cursor-pointer shadow hover:shadow-xl transition-shadow duration-300">
      <img className="w-32 h-32 object-cover rounded-lg" src={menu.Thumb} />
      <img
        ref={ref}
        className="w-32 h-32 object-cover rounded-lg transition-all absolute duration-500 ease-in"
        src={menu.Thumb}
        style={
          throwing
            ? {
                translate: "50% " + (window.innerHeight - 360) + "px",
                scale: 0.3,
                zIndex: 100,
              }
            : {}
        }
      />
      <div className="ml-4 flex flex-col justify-between grow">
        <div>
          <h4 className="font-bold text-green-600">{menu.Menu}</h4>
          <p className="text-slate-500 text-sm">{menu.Description}</p>
        </div>
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
          <div className="flex justify-between items-center">
            <div>
              <small className="text-slate-500 mr-1">Rp</small>
              <span className="text-lg font-semibold text-slate-600">
                {menu.Price / 1000}k
              </span>
            </div>
            <button
              onClick={handleOnClick}
              className="btn rounded-r-full rounded-l-full bg-green-500 text-white"
            >
              Add <PlusCircleIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
