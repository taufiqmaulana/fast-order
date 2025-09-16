const CardItem = () => (
  <div className="flex border-dashed border-sky-500 border p-4 rounded-lg cursor-pointer hover:shadow-xl transition-shadow duration-300">
    <img
      className="w-32 h-32 object-cover rounded-lg"
      src="https://plus.unsplash.com/premium_photo-1706024554526-a564f2f29879?w=512"
    />
    <div className="ml-4 flex flex-col justify-between grow">
      <div>
        <h4 className="font-bold text-green-600">Grassy Lemonade</h4>
        <p className="text-slate-500 text-sm">
          Fresh lemongrass shooting your day
        </p>
      </div>
      <div className="flex justify-between">
        <div className="rating">
          <input
            type="radio"
            name="rating-2"
            className="mask mask-star-2 bg-orange-400"
            aria-label="1 star"
          />
          <input
            type="radio"
            name="rating-2"
            className="mask mask-star-2 bg-orange-400"
            aria-label="2 star"
            defaultChecked
          />
          <input
            type="radio"
            name="rating-2"
            className="mask mask-star-2 bg-orange-400"
            aria-label="3 star"
          />
          <input
            type="radio"
            name="rating-2"
            className="mask mask-star-2 bg-orange-400"
            aria-label="4 star"
          />
          <input
            type="radio"
            name="rating-2"
            className="mask mask-star-2 bg-orange-400"
            aria-label="5 star"
          />
        </div>
        <span>Rp 17,000</span>
      </div>
    </div>
  </div>
);

function App() {
  return (
    <div className="sm:w-full lg:container p-8 m-auto border h-[100vh] border-sky-500">
      <h1 className="text-2xl">Fast Order</h1>
      <h2 className="text-xl mt-4">Beverages</h2>
      <div className="w-full mt-2 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        <CardItem />
        <CardItem />
        <CardItem />
        <CardItem />
        <CardItem />
        <CardItem />
      </div>
      <div className="fixed bg-green-700 text-white  bottom-2 left-0 flex w-full lg:w-100 h-16 justify-center items-center rounded-full">
        <span className="text-2xl">Place Order</span>
      </div>
    </div>
  );
}

export default App;
