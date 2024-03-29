export default function Participant({
  setPage,
  participantId,
  setParticipantId,
}) {
  /**
   * Function to handle key events. Invokes handleInput when Enter key is pressed.
   * @param {Object} e - The key event object.
   */
  const handleKey = (e) => {
    if (e.keyCode === 13) {
      // Invoke handleInput when Enter key is pressed
      handleInput(e);
    }
  };

  /**
   * Function to handle input events.
   * @param {Object} e - The input event object.
   */
  const handleInput = (e) => {
    e.preventDefault();

    // Validate the participant identifier before proceeding
    if (validateIdentifier()) {
      // Increment page number if identifier is valid
      setPage((prev) => prev + 1);
    }
  };

  /**
   * Function to validate the participant identifier.
   * @returns {boolean} - True if the identifier is valid, otherwise false.
   */
  const validateIdentifier = () => {
    // Regular expression for valid participant identifier format
    if (participantId) {
      // Convert participantId to lowercase
      setParticipantId(participantId.toLowerCase());
      if (participantId.length <= 50) return true;
    }
    return false;
  };

  return (
    <div className="main">
      <div className="participant-container">
        <p>
          Labdien! <br />
          <br />
          Esmu Latvijas Universitātes Datorzinātņu 4. kursa students Valters
          Hūns un bakalaura darba ietvaros veicu pētījumu par vizuālo uzmanību
          un cilvēka reakcijas laiku. Dalība kopumā aizņems aptuveni 5-10
          minūtes. <br />
          <br />
          Ievadiet savu identifikatoru
        </p>
        <input
          className="text-input"
          type="text"
          id="participantId"
          name="participantId"
          maxLength={50}
          onKeyUp={handleKey}
          onChange={(e) => setParticipantId(e.target.value)}
        />
        <button className="btn select-none" onClick={handleInput}>
          Tālāk
        </button>
      </div>
    </div>
  );
}
