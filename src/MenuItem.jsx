export const MenuItem = ({ menu, onClick }) =>
  menu ? (
    <div
      onClick={() => onClick(menu)}
      className="flex border-dashed border-sky-500 border p-4 rounded-lg cursor-pointer hover:shadow-xl transition-shadow duration-300"
    >
      <img className="w-32 h-32 object-cover rounded-lg" src={menu.Thumb} />
      <div className="ml-4 flex flex-col justify-between grow">
        <div>
          <h4 className="font-bold text-green-600">{menu.Menu}</h4>
          <p className="text-slate-500 text-sm">{menu.Description}</p>
        </div>
        <div className="flex flex-col sm:flex-row justify-between">
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
          <span>Rp {menu.Price}</span>
        </div>
      </div>
    </div>
  ) : null;
