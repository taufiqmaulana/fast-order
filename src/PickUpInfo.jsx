import { FirestoreDate } from "./utils";

const PickUpInfo = ({ pickUpPoint }) => {
  if (!pickUpPoint) return "";
  return (
    <div className="py-2 px-3 my-4 block border border-slate-200 shadow bg-slate-50 rounded-lg">
      <h3>
        <small className="text-slate-600">Pick Up at</small>
        <br />
        <span className="font-bold text-green-600">{pickUpPoint.Name}</span>
      </h3>
      <span className="text-sm text-slate-500">
        {FirestoreDate(pickUpPoint.PickUpDate).toDateString()}
      </span>
    </div>
  );
};

export default PickUpInfo;
