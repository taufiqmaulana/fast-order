import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import Cart from "./Cart";
import { MenuItem } from "./MenuItem";
import Onboard from "./Onboard";
import PickUpInfo from "./PickUpInfo";
import { firestore } from "./service/firebase";
import { useActiveOrder, usePickUpPoint } from "./service/hooks";
import WelcomePage from "./Welcome";
import { setLogLevel } from "firebase/data-connect";

function App() {
  const [landing, setLanding] = useState(true);
  const [menus, setMenus] = useState([]);
  const pickUpPoint = usePickUpPoint();
  const [order, setOrder] = useActiveOrder();
  const addOrder = ({ id, Menu, Price }) => {
    const items = [...order.items];
    const item = items.find((item) => item.id === id);
    if (item) {
      item.qty = item.qty + 1;
    } else {
      items.push({
        qty: 1,
        id,
        Menu,
        Price,
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
  if (landing) {
    return (
      <WelcomePage
        pickUpPoint={pickUpPoint}
        onOrder={() => setLanding(false)}
      />
    );
  }
  if (!order.id) {
    return <Onboard onHome={() => setLanding(true)} />;
  }
  return (
    <div className="max-w-3xl p-5 sm:p-8 m-auto mb-32">
      <h1 className="text-3xl font-bold text-pink-600">IBUNZA</h1>
      <h2>
        Hallo <b className="text-green-600">{order.name}</b>, Silahkan dipilih
        menunya
      </h2>
      <PickUpInfo pickUpPoint={pickUpPoint} />
      <div className="w-full mt-2 flex flex-col space-y-4">
        {menus.map((menu) => (
          <MenuItem key={menu.id} menu={menu} onClick={addOrder} />
        ))}
      </div>
      <Cart pickUpPoint={pickUpPoint} onClickHistory={() => setLanding(true)} />
    </div>
  );
}

export default App;
