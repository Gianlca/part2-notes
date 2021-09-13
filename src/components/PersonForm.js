import React from 'react'

export const PersonForm = ({addPerson, handleInputName, number, name, handleInputNumber}) => {
  return (
    <div>
    <form onSubmit={addPerson}>
      <div>
        name: <input value={name} onChange={handleInputName}/>
        number: <input value={number} onChange={handleInputNumber}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>        
    </div>
  )
}
