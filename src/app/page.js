"use client";
import React, { useState } from "react";
import Participant from "./pages/Participant";
import EmotionWheelPage from "./pages/EmotionWheelPage";
import SurveyPage from "./pages/SurveyPage";
import "./styles.css";
import Explanation from "./pages/Explanation";
import { saveData } from "./actions/actions";

export default function Home() {
  const [page, setPage] = useState(0);
  const [participantId, setParticipantId] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);

  const postData = async (data) => {
    const result = await saveData(participantId, data, selectedItems);
    return result; // Return the result
  };

  const conditionalComponent = () => {
    switch (page) {
      case 0:
        return (
          <Participant
            setPage={setPage}
            participantId={participantId}
            setParticipantId={setParticipantId}
          />
        );

      case 1:
        return <Explanation setPage={setPage} />;

      case 2:
        return (
          <EmotionWheelPage
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
            participantId={participantId}
            setPage={setPage}
          />
        );

      case 3:
        return <SurveyPage setPage={setPage} postData={postData} />;

      default:
        return (
          <Participant
            setPage={setPage}
            participantId={participantId}
            setParticipantId={setParticipantId}
          />
        );
    }
  };

  return conditionalComponent();
}
