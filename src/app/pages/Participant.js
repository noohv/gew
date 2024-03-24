export default function Participant({
  setPage,
  participantId,
  setParticipantId,
}) {
  const handleKey = (e) => {
    if (e.keyCode === 13) {
      handleInput(e);
    }
  };

  const handleInput = (e) => {
    e.preventDefault();

    if (validate()) {
      setPage((prev) => prev + 1);
    }
  };

  const validate = () => {
    const regex = /^[a-zA-Z]{2}\d{4}$/;
    if (participantId) {
      setParticipantId(participantId.toLowerCase());
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
