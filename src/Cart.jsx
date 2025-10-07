import { useLocalStorage } from "@uidotdev/usehooks";
import { collection, doc, writeBatch } from "firebase/firestore";
import { ArrowLeftCircle, Clock10, ShoppingCart } from "lucide-react";
import { useState } from "react";
import PickUpInfo from "./PickUpInfo";
import { firestore } from "./service/firebase";
import { Plus } from "lucide-react";
import { Minus } from "lucide-react";

const Cart = ({ pickUpPoint }) => {
  const [open, setOpen] = useState(false);
  const [order, setOrder] = useLocalStorage("order");
  const [orderHistory, setOrderHistory] = useLocalStorage("history", []);
  const placeOrder = async () => {
    if (!confirm("Pastikan pesanan sudah sesuai, lanjutkan pemesanan?")) return;
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
    setOrder({ items: [] });
  };
  const clearCart = () => {
    if (confirm("Apakah anda yakin akan membatalkan pesanan?")) {
      setOrder({ items: [] });
    }
  };
  const updQty = (i, sup) => {
    const items = [...order.items];
    const qty = items[i].qty + sup;
    items[i].qty = qty > -1 ? qty : 0;
    setOrder({ ...order, items });
  };

  const totalItems = order.items
    .map((item) => item.qty)
    .reduce((a, b) => a + b, 0);
  const totalPrice = order.items
    .map((item) => item.qty * item.Price)
    .reduce((a, b) => a + b, 0);

  return (
    <div
      className="card fixed max-w-3xl transition-all duration-1000 ease-in-out z-[100]"
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
      <div className="p-4 flex justify-between">
        <button
          id="cart-main"
          className="btn btn-xl rounded-full bg-green-600 text-white"
          onClick={() => setOpen(!open)}
        >
          {open ? (
            <ArrowLeftCircle />
          ) : (
            <>
              <ShoppingCart />
              <span>{totalItems < 100 ? totalItems : "+99"}</span>
            </>
          )}
        </button>
        {!open && (
          <button className="btn btn-xl rounded-full bg-blue-400 text-white">
            <Clock10 /> <span className="hidden md:inline">History</span>
          </button>
        )}
      </div>
      <div className="card-body">
        <h5>Keranjang Anda</h5>
        <table className="table table-sm p-0">
          <thead>
            <tr>
              <th>Item</th>
              <th>Qty.</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, i) => (
              <tr key={item.id}>
                <td><h4 className="font-bold text-green-600">#{i + 1}&nbsp;{item.Menu}</h4></td>
                <td className="flex items-center justify-between">
                  <button className="btn btn-xs rounded-full" onClick={() => updQty(i, -1)}><Minus size={10} /></button>
                  <span className="mx-1">{item.qty}</span>
                  <button className="btn btn-xs rounded-full" onClick={() => updQty(i, 1)}><Plus size={10} /></button>
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
        <PickUpInfo pickUpPoint={pickUpPoint} />
        {totalItems > 0 && (
          <>
            <button
              className="btn btn-lg rounded-full bg-green-600 text-white"
              onClick={placeOrder}
            >
              Order
            </button>
            <button
              className="btn btn-lg btn-outline rounded-full text-red-600"
              onClick={clearCart}
            >
              Batalkan
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
