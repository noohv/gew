import '../styles.css'

export default function Rate({ numOptions, rating, isSelected, handleChange, handleSave, handleDelete }) {

  const options = Array.from({ length: numOptions }, (_, index) => (
    <label key={index + 1} className={`rate-btn ${index + 1 == rating ? "checked" : ""}`} htmlFor={index + 1}>
      <input
        className="input-field"
        type='radio'
        name='rate'
        id={index + 1}
        value={index + 1}
        onChange={handleChange}
        checked={index + 1 == rating}
      />
      <p className='select-none'>{index + 1}</p>
    </label>
  ))

  return (
    <div className='center'>
      <div className='rate-container'>
        <div className='rate'>
          {options}
        </div>
        <div className='rate-buttons'>
          {isSelected ?
            <>
              <button className='btn delete select-none' onClick={handleDelete}>Noņemt</button>
              <button className='btn add select-none' onClick={handleSave}>Rediģēt</button>
            </>
            :
            <>
              <button className='btn add select-none' disabled={!rating} onClick={handleSave}>Pievienot</button>
            </>
          }
        </div>
      </div>
    </div>
  )
}
