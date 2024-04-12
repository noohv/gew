import React from "react";
import "survey-core/defaultV2.min.css";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import { useTranslations } from "next-intl";

export default function SurveyPage({ setPage, setSurveyData }) {
  const t = useTranslations("Survey");

  const surveyJson = {
    pages: [
      {
        name: "page2",
        title: t("survey-description"),
        elements: [
          {
            name: "dzimums",
            title: t("gender"),
            isRequired: true,
            type: "radiogroup",
            choices: [t("male"), t("female"), t("other")],
          },
          {
            name: "vecums",
            title: t("age"),
            isRequired: true,
            type: "text",
            inputType: "number",
          },
          {
            name: "izglitibas_joma",
            title: t("study-field"),
            type: "radiogroup",
            isRequired: true,
            choices: [
              {
                value: "socialas_zinatnes",
                text: t("social-science"),
              },
              {
                value: "dabas_zinatnes",
                text: t("natural-science"),
              },
              {
                value: "inzenierzinatnes",
                text: t("engineering"),
              },
              {
                value: "humanitaras",
                text: t("humanities"),
              },
              {
                value: "veselibas_aprupe",
                text: t("health-care"),
              },
              {
                value: "pakalpojumi",
                text: t("services"),
              },
              {
                value: "izglitiba",
                text: t("education"),
              },
              {
                value: "maksla",
                text: t("art"),
              },
            ],
            showOtherItem: true,
            otherPlaceholder: {
              default: "",
            },
            otherText: {
              default: t("other"),
            },
          },
          {
            name: "nodarbosanas",
            title: t("occupation"),
            type: "radiogroup",
            isRequired: true,
            choices: [
              {
                value: "vaditajs",
                text: t("manager"),
              },
              {
                value: "specialists",
                text: t("specialist"),
              },
              {
                value: "stradnieks",
                text: t("worker"),
              },
              {
                value: "zemnieks",
                text: t("farmer"),
              },
              {
                value: "uznemejs",
                text: t("businessman"),
              },
              {
                value: "students",
                text: t("student"),
              },
              {
                value: "majsaimniece",
                text: t("housewife"),
              },
              {
                value: "bezdarbnieks",
                text: t("unemployed"),
              },
            ],
            showOtherItem: true,
            otherPlaceholder: {
              default: "",
            },
            otherText: {
              default: t("other"),
            },
          },
          {
            name: "roka",
            title: t("hand"),
            type: "radiogroup",
            isRequired: true,
            choices: [
              {
                value: "right_handed",
                text: t("right-handed"),
              },
              {
                value: "left_handed",
                text: t("left-handed"),
              },
            ],
          },
          {
            type: "checkbox",
            name: "hobiji",
            title: t("hobbies"),
            description: t("multiple-choice"),
            isRequired: true,
            choices: [
              {
                value: "speles",
                text: t("video-games"),
              },
              {
                value: "ara_aktivitates",
                text: t("outside-activities"),
              },
              {
                value: "sports",
                text: t("sport"),
              },
              {
                value: "galda_speles",
                text: t("board-games"),
              },
              {
                value: "dejosana",
                text: t("dancing"),
              },
              {
                value: "muzicesana",
                text: t("music"),
              },
              {
                value: "vizuala_maksla",
                text: t("visual-arts"),
              },
            ],
            showOtherItem: true,
            otherPlaceholder: {
              default: "",
            },
            otherText: {
              default: t("other"),
            },
          },
          {
            visibleIf: "{hobiji} contains 'speles'",
            type: "radiogroup",
            name: "speles",
            title: t("computer-games"),
            isRequired: true,
            choices: [
              {
                value: "katru_dienu",
                text: t("every-day"),
              },
              {
                value: "dazas_reizes_nedela",
                text: t("few-times-week"),
              },
              {
                value: "dazas_reizes_menesi",
                text: t("few-times-month"),
              },
            ],
            showOtherItem: true,
            otherPlaceholder: {
              default: "",
            },
            otherText: {
              default: t("other"),
            },
          },

          {
            visibleIf: "{hobiji} contains 'speles'",
            type: "checkbox",
            name: "speles_veidi",
            title: t("game-type"),
            isRequired: true,
            choices: [
              {
                value: "sausana",
                text: t("shooting"),
              },
              {
                value: "simulatori",
                text: t("simulators"),
              },
              {
                value: "strategijas",
                text: t("strategy"),
              },
              {
                value: "piedzivojumi",
                text: t("adventures"),
              },
              {
                value: "muzikas",
                text: t("rythm"),
              },
              {
                value: "lomu",
                text: t("roleplay"),
              },
              {
                value: "logiskas",
                text: t("logic"),
              },
              {
                value: "galda",
                text: t("video-board-games"),
              },
              {
                value: "teksta",
                text: t("text-games"),
              },
            ],
            showOtherItem: true,
            otherPlaceholder: {
              default: "",
            },
            otherText: {
              default: t("other"),
            },
          },
        ],
      },
    ],
    completeText: t("next"),
    showQuestionNumbers: "off",
    showPrevButton: false,
    firstPageIsStarted: true,
    startSurveyText: "Sākt aptauju",
  };

  const survey = new Model(surveyJson);
  survey.onComplete.add((sender, options) => {
    sender.showCompletedPage = false;
    setPage((prev) => prev + 1);
    setSurveyData(sender.data);
  });

  return <Survey model={survey} />;
}
