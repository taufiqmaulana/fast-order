import { ArrowRightCircle, Instagram } from "lucide-react";
import Thumb1 from "./assets/welcome-1.png";
import PickUpInfo from "./PickUpInfo";

export default function WelcomePage({ pickUpPoint, onOrder }) {
    return (
        <div className="max-w-3xl p-5 sm:p-8 m-auto mb-32 flex flex-col space-y-2">
            <h1 className="text-3xl font-bold text-pink-600">IBUNZA</h1>
            <p>Happiness Begins at <span className="text-green-600 font-bold">Dapur Ibunza</span></p>
            <img src={Thumb1} className="aspect-square w-full" />
            {
                pickUpPoint && <>
                    <PickUpInfo pickUpPoint={pickUpPoint} />
                    <button className="btn btn-lg rounded-full bg-green-600 text-white" onClick={onOrder}><ArrowRightCircle /> Pilih Menu</button>
                </>
            }
            <a href="https://www.instagram.com/dapur.ibunza/" target="_blank" className="btn btn-lg rounded-full bg-pink-500 text-white"><Instagram /> Dapur Ibunza</a>
        </div>
    )
}