import axios from "axios";
import React, { useEffect, useState } from "react";
import personService from "../services/phonebooks";
import Filter from "./Filter";
import { Notification } from "./Notification";
import { PersonForm } from "./PersonForm";
import { Persons } from "./Persons";
export default function Phonebook() {
  const [persons, setPersons] = useState([]);
  const [name, setNewName] = useState("");
  const [number, setnumber] = useState("");
  const [filter, setFilter] = useState("");
  const [succesMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const addPerson = async (event) => {
    event.preventDefault();
    const newPersonObj = {
      name,
      number,
    };

    for (let element of persons) {
      if (element.name === name) {
        alert(`${name} is already added to phonebook`);
        return;
      }
    }

    await personService.createPerson(newPersonObj).then((response) => {
      setPersons(persons.concat(response.data));
      setSuccessMessage(`Added ${response.data.name}`);
      setNewName("");
      setnumber("");
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    });
  };

  const deletePerson = async (person) => {
    if (window.confirm(`"Do you want to delete ${person.name}?"`)) {
      await personService
        .deletePerson(person.id)
        .then((response) => {
          setPersons(persons.filter((n) => n.id !== person.id));
        })
        .catch((error) => {
          setErrorMessage(
            `Information of ${person.name} has already been removed from server`
          );
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });
    } else {
      console.log("don't delete this person");
    }
  };

  const handleInputName = (event) => {
    setNewName(event.target.value);
  };

  const handleInputNumber = (event) => {
    setnumber(event.target.value);
  };

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  const getPersons = () => {
    const url = "http://localhost:3001/persons";
    const promise = axios.get(url);
    return promise;
  };

  useEffect(() => {
    getPersons().then((response) => setPersons(response.data));
  }, []);

  const personsToShow = !filter
    ? persons
    : persons.filter((el) =>
        el.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
      );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={succesMessage} type={"success"} />
      <Notification message={errorMessage} type={"error"} />
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
        <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
      </div>
    </div>
  );
}
