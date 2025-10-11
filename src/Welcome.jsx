import { ArrowRightCircle, Instagram } from "lucide-react";
import Thumb1 from "./assets/welcome-1.png";
import Thumb2 from "./assets/welcome-2.png";
import Thumb3 from "./assets/welcome-3.jpeg";
import Thumb4 from "./assets/welcome-4.jpeg";
import Thumb5 from "./assets/welcome-5.jpeg";
import PickUpInfo from "./PickUpInfo";
import { useLocalStorage } from "@uidotdev/usehooks";

export default function WelcomePage({ pickUpPoint, onOrder }) {
  const [histories] = useLocalStorage("history");
  return (
    <div className="max-w-3xl p-5 sm:p-8 m-auto mb-32 flex flex-col space-y-2">
      <h1 className="text-3xl font-bold text-pink-600">IBUNZA</h1>
      <p>
        Happiness Begins at{" "}
        <span className="text-green-600 font-bold">Dapur Ibunza</span>
      </p>
      <div className="carousel carousel-center max-w-md space-x-4 p-4">
        <div className="carousel-item">
          <img src={Thumb1} className="h-96" />
        </div>
        <div className="carousel-item">
          <img src={Thumb2} className="h-96" />
        </div>
        <div className="carousel-item">
          <img src={Thumb3} className="h-96" />
        </div>
        <div className="carousel-item">
          <img src={Thumb4} className="h-96" />
        </div>
        <div className="carousel-item">
          <img src={Thumb5} className="h-96" />
        </div>
      </div>
      {pickUpPoint && (
        <>
          <PickUpInfo pickUpPoint={pickUpPoint} />
          <button
            className="btn btn-lg rounded-full bg-green-600 text-white"
            onClick={onOrder}
          >
            <ArrowRightCircle /> Pilih Menu
          </button>
        </>
      )}
      <a
        href="https://www.instagram.com/dapur.ibunza/"
        target="_blank"
        className="btn btn-lg rounded-full bg-pink-500 text-white"
      >
        <Instagram /> Dapur Ibunza
      </a>
      <h2 className="my-4 font-bold">Order History :</h2>
      <div>
        {histories?.map((h) => {
          const totalItems = h.items
            .map((item) => item.qty)
            .reduce((a, b) => a + b, 0);
          const totalPrice = h.items
            .map((item) => item.qty * item.Price)
            .reduce((a, b) => a + b, 0);
          return (
            <div
              key={h.id}
              className="py-2 px-3 my-4 block border border-slate-200 shadow bg-slate-50 rounded-lg"
            >
              <h4 className="text-green-600 font-bold">{h.name}</h4>
              <table className="table table-sm p-0">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Qty.</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {h.items.map((item, i) => (
                    <tr key={item.id}>
                      <td>
                        <h4 className="font-bold text-green-600">
                          #{i + 1}&nbsp;{item.Menu}
                        </h4>
                      </td>
                      <td>
                        <span className="mx-1">{item.qty}</span>
                      </td>
                      <td>Rp. {item.qty * item.Price}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td>Total</td>
                    <td className="text-md">{totalItems}</td>
                    <td className="text-md">Rp. {totalPrice}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          );
        })}
      </div>
    </div>
  );
}
