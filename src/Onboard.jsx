import { useState } from "react";
import { useActiveOrder, usePickUpPoint } from "./service/hooks";
import { addDoc, collection, doc } from "firebase/firestore";
import { firestore } from "./service/firebase";

const Onboard = () => {
  const pickUpPoint = usePickUpPoint();
  const [_, setOrder] = useActiveOrder();
  const [onboard, setOnboard] = useState({ name: "", phone: "" });
  const createOrder = async () => {
    if (!onboard.name) {
      alert("Maaf, Namanya mohon diisi :)");
      return;
    }
    if (!pickUpPoint) {
      alert("Invalid pickup point !");
      return;
    }
    const order = await addDoc(collection(firestore, "Order"), {
      PickUpPoint: doc(firestore, "/PickUpPoint/" + pickUpPoint.id),
      Name: onboard.name,
      Contact: onboard.contact || "-",
    });
    setOrder({
      id: order.id,
      name: onboard.name,
      items: [],
    });
  };
  return (
    <div className="container m-auto">
      <h1>Selamat Datang di Dapur Ibunza</h1>
      <p>Pesanannya atas nama siapa?</p>
      <input
        className="input"
        placeholder="Nama"
        value={onboard.name}
        onChange={(e) => setOnboard({ ...onboard, name: e.target.value })}
      />
      <p>Boleh dibantu nomor telponnya apablia berkenan?</p>
      <input
        className="input"
        placeholder="No. Handphone"
        onChange={(e) => setOnboard({ ...onboard, phone: e.target.value })}
      />
      <button
        onClick={createOrder}
        className="btn block bg-green-500 text-white mt-4"
      >
        Lanjutkan
      </button>
    </div>
  );
};

export default Onboard;
