import { useEffect } from "react";
import { useState } from "react";
import { firestore } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { useLocalStorage } from "@uidotdev/usehooks";

export function usePickUpPoint() {
  const [pickUpPoint, setPickUpPoint] = useState(null);
  const [_, setOrder] = useActiveOrder();

  useEffect(() => {
    const loadPickUpPoint = async () => {
      const ref = doc(
        firestore,
        "PickUpPoint",
        window.location.pathname.replace("/", ""),
      );
      const ppSnap = await getDoc(ref);
      if (!ppSnap.exists()) {
        setOrder({ items: [] });
        return;
      }
      const pp = ppSnap.data();
      if (!pp.Open) {
        setOrder({ items: [] });
        return;
      }
      setPickUpPoint(pp);
    };

    loadPickUpPoint();
  }, []);

  return pickUpPoint;
}

export function useActiveOrder() {
  return useLocalStorage("order", { items: [] });
}
