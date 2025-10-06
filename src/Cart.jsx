import { useLocalStorage } from "@uidotdev/usehooks";
import { collection, doc, writeBatch } from "firebase/firestore";
import { ArrowLeftCircle, Clock10, ShoppingCart } from "lucide-react";
import { useState } from "react";
import PickUpInfo from "./PickUpInfo";
import { firestore } from "./service/firebase";

const Cart = ({ pickUpPoint }) => {
  const [open, setOpen] = useState(false);
  const [order, setOrder] = useLocalStorage("order");
  const [orderHistory, setOrderHistory] = useLocalStorage("history", []);
  const placeOrder = async () => {
    if (order.items.length === 0) return;
    const batch = writeBatch(firestore);
    const orderDoc = collection(firestore, "OrderItem");
    order.items.forEach((item) => {
      batch.set(doc(orderDoc), {
        Menu: doc(firestore, "/Menu/" + item.id),
        Qty: item.qty,
        Order: doc(firestore, "/Order/" + order.id),
      });
    });
    await batch.commit();
    setOrderHistory([...orderHistory, { ...order }]);
    clearCart();
  };
  const clearCart = () => {
    setOrder({ items: [] });
  };
  const totalItems = order.items
    .map((item) => item.qty)
    .reduce((a, b) => a + b, 0);
  const totalPrice = order.items
    .map((item) => item.qty * item.Price)
    .reduce((a, b) => a + b, 0);

  return (
    <div
      className="card fixed transition-all duration-1000 ease-in-out"
      style={
        open
          ? {
            backgroundColor: "white",
            border: "1px solid green",
            top: 25,
            bottom: 25,
            left: 25,
            right: 25,
            overflowY: "auto",
          }
          : {
            backgroundColor: "transparent",
            border: "1px solid transparent",
            top: window.innerHeight - 115,
            bottom: 25,
            left: 25,
            right: 25,
            overflowY: "hidden",
          }
      }
    >
      <div className="p-4 flex">
        <button
          className="btn btn-xl rounded-l-full grow bg-green-600 text-white"
          onClick={() => setOpen(!open)}
        >
          {open ? (
            <ArrowLeftCircle />
          ) : (
            <>
              <ShoppingCart />
              <div className="badge badge-sm">
                {totalItems < 100 ? totalItems : "+99"}
              </div>
            </>
          )}
        </button>
        {open && (
          <button
            className="btn btn-xl bg-red-600 text-white"
            onClick={clearCart}
          >
            Batal
          </button>
        )}
        <button className="btn btn-xl rounded-r-full bg-blue-400 text-white">
          <Clock10 /> <span className="hidden md:inline">History</span>
        </button>
      </div>
      <div className="card-body">
        <h5>Keranjang Anda</h5>
        <table className="table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Qty.</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item) => (
              <tr key={item.id}>
                <td>{item.Menu}</td>
                <td>{item.qty}</td>
                <td>Rp. {item.qty * item.Price}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td>Total</td>
              <td>{totalItems}</td>
              <td>Rp. {totalPrice}</td>
            </tr>
          </tfoot>
        </table>
        <PickUpInfo pickUpPoint={pickUpPoint} />
        {totalItems > 0 && (
          <button
            className="btn btn-xl bg-green-600 text-white"
            onClick={placeOrder}
          >
            Order Sekarang
          </button>
        )}
      </div>
    </div>
  );
};

export default Cart;
