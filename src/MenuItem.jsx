import { ArrowLeft } from "lucide-react";
import { PlusCircleIcon } from "lucide-react";
import { useState } from "react";
import { useRef } from "react";

const Rating = ({ value }) => (
  <div className="rating">
    <div
      className="mask mask-star-2 bg-orange-400"
      aria-label="1 star"
      aria-current={value === 1}
    ></div>
    <div
      className="mask mask-star-2 bg-orange-400"
      aria-label="2 star"
      aria-current={value === 2}
    ></div>
    <div
      className="mask mask-star-2 bg-orange-400"
      aria-label="3 star"
      aria-current={value === 3}
    ></div>
    <div
      className="mask mask-star-2 bg-orange-400"
      aria-label="4 star"
      aria-current={value === 4}
    ></div>
    <div
      className="mask mask-star-2 bg-orange-400"
      aria-label="5 star"
      aria-current={value === 5}
    ></div>
  </div>
);

export const MenuItem = ({ menu, onClick }) => {
  const refThumb = useRef();
  const [showVariant, setShowVariant] = useState(false);
  const atcEffect = () => {
    const movableObject = refThumb.current;
    const absoluteContainer = document.getElementById("cart-main");
    // Get current position and dimensions
    const currentRect = movableObject.getBoundingClientRect();
    const absoluteRect = absoluteContainer.getBoundingClientRect();

    // Calculate positions relative to viewport
    const startX = currentRect.left;
    const startY = currentRect.top;

    const endX =
      absoluteRect.left + (absoluteRect.width - currentRect.width) / 2;
    const endY =
      absoluteRect.top + (absoluteRect.height - currentRect.height) / 2;

    // Create animation element
    const clone = movableObject.cloneNode(true);
    clone.style.position = "fixed";
    clone.style.top = `${startY}px`;
    clone.style.left = `${startX}px`;
    clone.style.margin = "0";
    clone.style.zIndex = "100";
    document.body.appendChild(clone);

    // Animate the clone
    const duration = 1500; // ms
    const startTime = performance.now();

    function animate(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic animation
      const easeProgress = 1 - Math.pow(1 - progress, 3);

      const currentX = startX + (endX - startX) * easeProgress;
      const currentY = startY + (endY - startY) * easeProgress;

      clone.style.left = `${currentX}px`;
      clone.style.top = `${currentY}px`;
      clone.style.transform = `scale(${1 - progress}) rotate(${-360 * easeProgress}deg)`;

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        document.body.removeChild(clone);
      }
    }

    requestAnimationFrame(animate);
  };

  const handleOnClick = () => {
    setShowVariant(false);
    atcEffect();
    onClick(menu);
  };

  if (!menu) return "";
  return (
    <div className="p-4 rounded-lg justify-between shadow hover:shadow-xl bg-white transition-shadow duration-300 relative overflow-hidden">
      <div className="flex">
        <div className="mr-2 flex flex-col justify-between grow max-w-50">
          <div>
            <h4 className="font-bold text-green-600">{menu.Menu}</h4>
            <p className="text-slate-500 text-sm">{menu.Description}</p>
          </div>
          <div className="flex flex-col justify-between">
            <Rating value={menu.Rating} />
            <div>
              <small className="text-slate-500 mr-1">Rp</small>
              <span className="text-lg font-semibold text-slate-600">
                {menu.Price / 1000}k
              </span>
            </div>
          </div>
        </div>
        <div
          className="relative hover:shadow-xl"
          style={{ width: 128, height: 128 }}
        >
          <img
            ref={refThumb}
            className="object-cover rounded-lg"
            style={{ width: 128, height: 128 }}
            src={menu.Thumb}
          />
          <button
            onClick={() => setShowVariant(true)}
            className="btn rounded-r-full rounded-l-full bg-green-500 text-white top-24 left-5 absolute"
          >
            Add <PlusCircleIcon />
          </button>
        </div>
      </div>
      <div className="flex bg-white p-4 justify-between space-x-4 absolute top-0 right-0 left-0 transition-all duration-500 ease-in-out" style={{ top: showVariant ? 0 : 155 }}>
        <div className="flex flex-col space-y-2">
          <button className="btn btn-warning btn-xs" onClick={() => setShowVariant(false)}><ArrowLeft size={12} /></button>
          <h4 className="font-bold text-green-600 text-xs">{menu.Menu}</h4>
        </div>
        {
          ["Normal", "Less Sugar", "No Sugar"].map(v => (
            <div className="flex flex-col items-center" key={v}>
              <span className="font-bold text-pink-500 text-sm">{v}</span>
              <img
                className="object-cover rounded-lg mt-1"
                style={{ width: 80, height: 80 }}
                src={menu.Thumb}
              />
              <button
                onClick={handleOnClick}
                className="btn btn-sm rounded-r-full rounded-l-full bg-green-500 text-white mt-1"
              >
                Add <PlusCircleIcon />
              </button>
            </div>
          ))
        }
      </div>
    </div>
  );
};
