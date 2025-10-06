import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import Cart from "./Cart";
import { MenuItem } from "./MenuItem";
import Onboard from "./Onboard";
import PickUpInfo from "./PickUpInfo";
import { firestore } from "./service/firebase";
import { useActiveOrder, usePickUpPoint } from "./service/hooks";

function App() {
  const [menus, setMenus] = useState([]);
  const pickUpPoint = usePickUpPoint();
  const [order, setOrder] = useActiveOrder();
  const addOrder = (menu) => {
    const items = [...order.items];
    const item = items.find((item) => item.id === menu.id);
    if (item) {
      item.qty = item.qty + 1;
    } else {
      items.push({
        qty: 1,
        ...menu,
      });
    }
    setOrder({ ...order, items });
  };
  useEffect(() => {
    const q = query(collection(firestore, "Menu"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      setMenus(items);
    });

    return () => unsubscribe();
  }, []);
  if (!pickUpPoint) {
    return (
      <div>
        <h1>Selamat Datang di Dapur Ibunza</h1>
      </div>
    );
  }
  if (!order.id) {
    return <Onboard />;
  }
  return (
    <div className="sm:w-full lg:container p-8 m-auto mb-32">
      <h1 className="text-3xl font-bold text-pink-600">IBUNZA</h1>
      <h2>Hallo {order.name}, Silahkan dipilih menunya</h2>
      <PickUpInfo pickUpPoint={pickUpPoint} />
      <div className="w-full mt-2 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {menus.map((menu) => (
          <MenuItem key={menu.id} menu={menu} onClick={addOrder} />
        ))}
      </div>
      <Cart pickUpPoint={pickUpPoint} />
    </div>
  );
}

export default App;
