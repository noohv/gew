import React from "react";

export default function Explanation({ setPage }) {
  return (
    <div className="main">
      <div className="participant-container">
        <p className="explanation">
          Sekojošajā uzdevumā Jums būs jānovērtē savas šī brīža emocijas dotajā
          aplī. Ja Jūs nejūtat nekādas emocijas, lūdzu, atzīmējiet izvēli
          "Neviena" apļa centrā. Ja Jūsu šī brīža emocijas ļoti atšķiras no aplī
          norādītajām emocijām, lūdzu, atzīmējiet izvēli "Cits" un ierakstiet
          attiecīgo emociju. Katrai no atzīmētajām emocijām Jums jānovērtē arī
          tās intensitāte no 1-'vāja' līdz 5-'stipra'
        </p>
        <button
          className="btn select-none"
          onClick={() => setPage((prev) => prev + 1)}
        >
          Tālāk
        </button>
      </div>
    </div>
  );
}
