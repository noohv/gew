import '../styles.css'

export default function Rate({ numOptions, rating, isSelected, handleChange, handleRatingSave, handleDelete }) {

  const options = Array.from({ length: numOptions }, (_, index) => (
    <button
      key={index}
      type="button"
      className={`rating-element select-none ${index + 1 == rating ? "checked" : ""}`}
      onClick={handleChange}
      value={index + 1}
    >
      {index + 1}
    </button>
  ))

  return (
    <div className='center'>
      <div className='rating-section'>
        <div className='rating-bar-container'>
          {options}
        </div>
        <div className='rate-buttons'>
          {isSelected ?
            <>
              <button className='btn delete select-none' onClick={handleDelete}>Noņemt</button>
              <button className='btn add select-none' onClick={handleRatingSave}>Rediģēt</button>
            </>
            :
            <>
              <button className='btn add select-none' disabled={!rating} onClick={handleRatingSave}>Pievienot</button>
            </>
          }
        </div>
      </div>
    </div>
  )
}
