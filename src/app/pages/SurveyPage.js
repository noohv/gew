"use client";
import React from "react";
import "survey-core/defaultV2.min.css";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import { themeJson } from "../utils/survey_theme";

const surveyJson = {
  pages: [
    {
      name: "page1",
      title: "Lūdzu sniedziet atbildes par sevi!",
      elements: [
        {
          name: "response_time",
          title: "Emocijas atzīmēju:",
          isRequired: true,
          type: "radiogroup",
          choices: [
            "Pirms treniņa",
            "Pēc treniņa",
            "Pirms sacensībām",
            "Pēc sacensībām",
          ],
          showOtherItem: true,
          otherPlaceholder: {
            default: "",
          },
          otherText: {
            default: "Cits",
          },
        },
        {
          visibleIf:
            "{response_time} = 'Pēc treniņa' or {response_time} = 'Pēc sacensībām'",
          name: "activity_intensity",
          title: "Kāda bija aktivitātes intensitāte?",
          type: "radiogroup",
          isRequired: true,
          choices: ["Augsta", "Vidēja", "Zema"],
        },
        {
          visibleIf:
            "{response_time} = 'Pēc treniņa' or {response_time} = 'Pēc sacensībām'",
          name: "activity_duration",
          title: "Cik ilgi veicāt aktivitāti?",
          description: "Laiku norādīt minūtēs",
          type: "text",
          inputType: "number",
          isRequired: true,
        },
        {
          visibleIf:
            "{response_time} = 'Pēc treniņa' or {response_time} = 'Pēc sacensībām'",
          name: "time_since_activity",
          title: "Cik ilgs laiks pagājis kopš aktivitātes veikšanas?",
          isRequired: true,
          type: "radiogroup",
          choices: ["Līdz 30 min", "30 min - 2h", "2 - 24h"],
          showOtherItem: true,
          otherPlaceholder: {
            default: "",
          },
          otherText: {
            default: "Cits laiks",
          },
        },
        {
          visibleIf:
            "{response_time} = 'Pēc treniņa' or {response_time} = 'Pēc sacensībām'",
          type: "rating",
          name: "activity_result_rating",
          title: "Kā novērtētu aktivitātē sasniegto rezultātu?",
          isRequired: true,
          minRateDescription: "Neveiksmīgs",
          maxRateDescription: "Veiksmīgs",
          rateCount: 5,
          rateMax: 5,
          displayMode: "buttons",
          rateDescriptionLocation: "bottom",
        },
      ],
    },
  ],
  completeText: "Iesniegt",
  completedHtml: "Paldies par dalību!",
  showQuestionNumbers: "off",
  showPrevButton: false,
  firstPageIsStarted: true,
};

const customCss = {
  completedPage: "main",
};

export default function SurveyPage({ setPage, postData }) {
  const survey = new Model(surveyJson);
  survey.applyTheme(themeJson);
  survey.css = customCss;

  survey.onComplete.add((sender, options) => {
    options.showSaveInProgress("Saglabā...");
    postData(sender.data).then((result) => {
      if (result.success) {
        options.showSaveSuccess("Saglabāts!");
      } else {
        options.showSaveError("Neizdevās saglabāt!");
      }
    });
  });

  survey.onErrorCustomText.add(function (sender, options) {
    if (options.name == "required") {
      options.text = "Atbilde ir obligāta!";
    }
  });

  return <Survey model={survey} />;
}
