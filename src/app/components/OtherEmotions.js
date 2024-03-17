import React, { useState } from "react";
import clsx from "clsx";
import Input from "./Input";
import Rate2 from "./Rate2";
import OtherEmotionList from "./OtherEmotionList";

export default function OtherEmotions({
  selectedItems,
  setSelectedItems,
  currentItem,
  setCurrentItem,
  handleClick,
  rating,
  setRating,
  handleChange,
}) {
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState();

  const otherEmotions = selectedItems.find(
    (item) => item.id == "other"
  )?.emotions;

  const deleteItem = (index) => {
    const updatedItems = [...otherEmotions];
    updatedItems.splice(index, 1);

    if (updatedItems.length === 0) {
      setSelectedItems((current) =>
        current.filter((item) => {
          return item.id != "other";
        })
      );
      setCurrentItem();
    } else {
      setSelectedItems((prevData) => {
        return prevData.map((emotion) => {
          if (emotion.id === "other") {
            return {
              ...emotion,
              emotions: updatedItems,
            };
          }
          return emotion;
        });
      });
    }
  };

  const editItem = (index) => {
    setEditMode(true);
    setEditIndex(index);
    const editData = {
      id: "other",
      name: "Cits",
      value: otherEmotions[index].name,
    };
    setCurrentItem(editData);
    setRating(otherEmotions[index].rating);
  };

  const saveEdit = () => {
    const updatedItems = otherEmotions.map((c, i) => {
      if (i === editIndex) {
        return { name: currentItem.value, rating: rating };
      } else {
        return c;
      }
    });

    setSelectedItems((prevData) => {
      return prevData.map((emotion) => {
        if (emotion.id === "other") {
          return {
            ...emotion,
            emotions: updatedItems,
          };
        }
        return emotion;
      });
    });
    cancelEdit();
  };

  const cancelEdit = () => {
    setEditMode(false);
    setCurrentItem((prev) => ({ id: prev.id, name: prev.name }));
    setRating(undefined);
  };

  return (
    <div className="center">
      <div className="participant-container">
        <div className="input-name">
          <p>Emocijas nosaukums</p>
        </div>
        <Input
          type="text"
          name="participantId"
          maxLength={30}
          value={currentItem?.value || ""}
          onChange={(e) =>
            setCurrentItem({ ...currentItem, value: e.target.value })
          }
        />
        <Rate2 rating={rating} handleChange={handleChange} />

        {editMode ? (
          <>
            <button className="btn cancel" onClick={cancelEdit}>
              Atcelt
            </button>
            <button
              className="btn"
              disabled={currentItem?.value && rating ? false : true}
              onClick={saveEdit}
            >
              Rediģēt
            </button>
          </>
        ) : (
          <button
            className="btn"
            disabled={currentItem?.value && rating ? false : true}
            onClick={handleClick}
          >
            Pievienot
          </button>
        )}
        {otherEmotions && (
          <OtherEmotionList
            emotions={otherEmotions}
            handleDelete={deleteItem}
            handleEdit={editItem}
          />
        )}
      </div>
    </div>
  );
}
