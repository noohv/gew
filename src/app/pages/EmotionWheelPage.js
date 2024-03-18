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
        Lūdzu, novērtējiet, savu šā brīža emocionālo stāvokli!
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
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V173.3c0-17-6.7-33.3-18.7-45.3L352 50.7C340 38.7 323.7 32 306.7 32H64zm0 96c0-17.7 14.3-32 32-32H288c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V128zM224 288a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
