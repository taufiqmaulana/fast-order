import { PlusCircleIcon } from "lucide-react";
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
      clone.style.transform = `scale(${1 - (1 - 0.3) * (progress / 0.5)}) rotate(${-360 * easeProgress}deg)`;

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        document.body.removeChild(clone);
      }
    }

    requestAnimationFrame(animate);
  };

  const handleOnClick = () => {
    atcEffect();
    onClick(menu);
  };

  if (!menu) return "";
  return (
    <div className="flex p-4 rounded-lg shadow hover:shadow-xl bg-white transition-shadow duration-300">
      <div className="mr-2 flex flex-col justify-between grow">
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
          onClick={handleOnClick}
          className="btn rounded-r-full rounded-l-full bg-green-500 text-white top-24 left-5 absolute"
        >
          Add <PlusCircleIcon />
        </button>
      </div>
    </div>
  );
};
