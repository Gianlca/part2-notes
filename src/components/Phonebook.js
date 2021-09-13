import React, { useState} from 'react'
import Filter from './Filter';
import { PersonForm } from './PersonForm';
import { Persons } from './Persons';

export default function Phonebook() {
  const [persons, setpPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);

  const [name, setNewName] = useState('');
  const [number, setnumber] = useState('');
  const [filter, setFilter] = useState('');

  const addPerson = (event) => {
    event.preventDefault();
    const newPersonObj = {
      name,
      number
    };

    for(let element of persons) {
      if(element.name === name) {
        alert(`${name} is already added to phonebook`)
        return
      };
    }

    setpPersons(persons.concat(newPersonObj));
    setNewName('');
    setnumber('');
  }

  const handleInputName = (event) => {
    setNewName(event.target.value);
  }

  const handleInputNumber = (event) => {
    setnumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value);
  }
  const personsToShow = !filter ? persons : persons.filter(el => el.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()));
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilter={handleFilter} />
      <br />
      <h3>Add a new person</h3>
      <PersonForm
        addPerson={addPerson}
        handleInputName={handleInputName}
        number={number}
        name={name}
        handleInputNumber={handleInputNumber}
      />
      <h2>Numbers</h2>
      <div>
        <Persons personsToShow={personsToShow} />
      </div>
    </div>
  );
}
