"use client";
import React, { useState } from "react";
import Participant from "./pages/Participant";
import EmotionWheelPage from "./pages/EmotionWheelPage";
import FinalPage from "./pages/FinalPage";
import SurveyPage from "./pages/SurveyPage";
import "./styles.css";

export default function Home() {
  const [page, setPage] = useState(0);
  const [participantId, setParticipantId] = useState();
  const [selectedItems, setSelectedItems] = useState([]);
  const [surveyData, setSurveyData] = useState();

  // True to show survey, false to hide it
  const showSurvey = true;

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
        if (showSurvey)
          return <SurveyPage setSurveyData={setSurveyData} setPage={setPage} />;
        else {
          setPage((prev) => prev + 1);
          return;
        }
      case 2:
        return (
          <EmotionWheelPage
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
            participantId={participantId}
            setPage={setPage}
            surveyData={surveyData}
          />
        );
      case 3:
        return <FinalPage />;
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
