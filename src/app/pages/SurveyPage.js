import React from "react";
import "survey-core/defaultV2.min.css";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";

const surveyJson = {
  pages: [
    {
      name: "page1",
      title: "Aptauja",
      description: "Lūdzu aizpildiet informāciju par sevi!",
      elements: [
        {
          name: "dzimums",
          title: "Jūsu dzimums:",
          isRequired: true,
          type: "radiogroup",
          choices: ["Vīrietis", "Sieviete", "Cits"],
        },
        {
          name: "vecums",
          title: "Jūsu vecums:",
          isRequired: true,
          type: "text",
        },
        {
          name: "izglitibas_joma",
          title: "Jūsu izglītības joma",
          type: "radiogroup",
          isRequired: true,
          choices: [
            {
              value: "skolens",
              text: "Skolēns",
            },
            {
              value: "socialas_zinatnes",
              text: "Sociālās zinātnes",
            },
            {
              value: "dabas_zinatnes",
              text: "Dabas zinātnes",
            },
            {
              value: "inzenierzinatnes",
              text: "Inženierzinātnes",
            },
            {
              value: "humanitaras",
              text: "Humanitārās zinātnes",
            },
            {
              value: "veselibas_aprupe",
              text: "Veselības aprūpe",
            },
            {
              value: "pakalpojumi",
              text: "Pakalpojumi",
            },
            {
              value: "izglitiba",
              text: "Izglītība",
            },
            {
              value: "maksla",
              text: "Māksla",
            },
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
          name: "nodarbosanas",
          title: "Jūsu nodarbošanās",
          type: "radiogroup",
          isRequired: true,
          choices: [
            {
              value: "vaditajs",
              text: "Augstākā vai vidējā līmeņa vadītājs",
            },
            {
              value: "specialists",
              text: "Speciālists, ierēdnis",
            },
            {
              value: "stradnieks",
              text: "Strādnieks, strādā fizisku darbu",
            },
            {
              value: "zemnieks",
              text: "Zemnieks (ir sava zemnieku saimniecība)",
            },
            {
              value: "uznemejs",
              text: "Ir savs uzņēmums, individuālais darbs",
            },
            {
              value: "students",
              text: "Skolēns, students",
            },
            {
              value: "majsaimniece",
              text: "Mājsaimniece (-ks), bērna kopšanas atvaļinājums",
            },
            {
              value: "bezdarbnieks",
              text: "Bezdarbnieks",
            },
          ],
          showOtherItem: true,
          otherPlaceholder: {
            default: "",
          },
          otherText: {
            default: "Cits",
          },
        },
      ],
    },
  ],
  completeText: "Turpināt",
  showQuestionNumbers: "off",
  showPrevButton: false,
  firstPageIsStarted: true,
};

export default function SurveyPage({ setPage, setSurveyData }) {
  const survey = new Model(surveyJson);
  survey.onComplete.add((sender, options) => {
    sender.showCompletedPage = false;
    setPage((prev) => prev + 1);
    setSurveyData(sender.data);
  });

  return <Survey model={survey} />;
}
