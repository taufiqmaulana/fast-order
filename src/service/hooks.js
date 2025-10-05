import { useEffect } from "react";
import { useState } from "react";
import { firestore } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { useLocalStorage } from "@uidotdev/usehooks";

export function usePickUpPoint() {
  const [pickUpPoint, setPickUpPoint] = useState(null);

  useEffect(() => {
    const loadPickUpPoint = async () => {
      const ref = doc(
        firestore,
        "PickUpPoint",
        window.location.pathname.replace("/", ""),
      );
      const ppSnap = await getDoc(ref);
      if (ppSnap.exists()) {
        setPickUpPoint(ppSnap.data());
      }
    };

    loadPickUpPoint();
  }, []);

  return pickUpPoint;
}

export function useActiveOrder() {
  return useLocalStorage("order", { items: [] });
}
