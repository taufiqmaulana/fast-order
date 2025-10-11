import { useState } from "react";
import { useActiveOrder, usePickUpPoint } from "./service/hooks";
import { addDoc, collection, doc } from "firebase/firestore";
import { firestore } from "./service/firebase";
import PickUpInfo from "./PickUpInfo";
import { ArrowRightCircle } from "lucide-react";

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
    <div className="max-w-3xl p-5 sm:p-8 m-auto mb-32">
      <div className="card bg-base-100 shadow-sm lg:m-auto">
        <div className="card-body">
          <h1 className="text-3xl font-bold text-pink-600">IBUNZA</h1>
          <h2 className="">Selamat Datang</h2>
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
          <PickUpInfo pickUpPoint={pickUpPoint} />
          <div className="card-actions justify-center">
            <button
              onClick={createOrder}
              className="btn btn-lg rounded-r-full rounded-l-full bg-green-500 text-white mt-4"
            >
              Pilih Menu <ArrowRightCircle />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboard;
