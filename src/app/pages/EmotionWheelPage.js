import React, { useState } from "react";
import clsx from "clsx";
import Wheel from "../components/Wheel";
import { saveData } from "../actions/actions";

export default function EmotionWheelPage({
  setPage,
  participantId,
  selectedItems,
  setSelectedItems,
}) {
  const [showSave, setShowSave] = useState(true);

  const handleSave = () => {
    setShowSave(false);
    if (!isEmpty()) {
      const postData = async () => {
        const response = await saveData(participantId, selectedItems);
      };
      postData().then(() => {
        setSelectedItems([{}]);
        setPage((prev) => prev + 1);
      });
    }
  };

  const isEmpty = () => {
    return selectedItems.length > 0 ? false : true;
  };

  return (
    <div className="container">
      <h3 className="page-title">
        Lūdzu, atzīmē šā brīža emocijas un to intensitāti skalā no 1 (vāja) līdz
        5 (stipra)!
      </h3>
      <Wheel
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
      />

      <div
        className={clsx("save", {
          ["show"]: !isEmpty() && showSave,
        })}
      >
        <button className="btn" disabled={isEmpty()} onClick={handleSave}>
          Iesniegt
        </button>
      </div>
    </div>
  );
}
