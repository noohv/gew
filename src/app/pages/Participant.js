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
    const regex = /^[a-zA-Z]{2}\d{4}$/;
    if (participantId) {
      // Convert participantId to lowercase
      setParticipantId(participantId.toLowerCase());
      // Check if participantId matches the regex pattern
      if (participantId.match(regex)) {
        return true;
      }
    }
    return false;
  };

  return (
    <div className="main">
      <div className="participant-container">
        <p>Ievadiet savu identifikatoru</p>
        <input
          className="text-input"
          type="text"
          id="participantId"
          name="participantId"
          maxLength={6}
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
