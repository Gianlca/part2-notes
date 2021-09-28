import React from "react";

export const Persons = ({ personsToShow, deletePerson }) => {
  return (
    <div>
      {personsToShow.map((person) => (
        <div key={person.name}>
          {person.name} - {person.number}
          <button onClick={() => deletePerson(person)}>delete</button>
        </div>
      ))}
    </div>
  );
};
