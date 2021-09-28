import { useState, useEffect } from "react";
import axios from "axios";

export const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState("");

  const getCountries = async () => {
    const url = ` https://api.countrylayer.com/v2/name/${query}?access_key=7b84c7dfad9958c4919908535a89017b`;
    const response = await axios.get(url);
    return response;
  };

  const handleInput = async (event) => {
    const value = event.target.value;
    setQuery(value);
  };

  useEffect(() => {
    async function fetchCountries() {
      const response = await getCountries();
      setCountries(response.data);
    }
    fetchCountries();
  }, [query]);

  return (
    <div>
      <input type="text" onChange={handleInput} />
      {countries ? <Country countries={countries}></Country> : null}
    </div>
  );
};

const Country = (props) => {
  if (props.countries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  } else if (props.countries.length === 1) {
    return (
      <div>
        {props.countries.map((el) => (
          <div key={el.numericCode}>
            <h2>{el.name}</h2>
            <div>capital {el.capital}</div>
            <div>population {el.population}</div>
            <h4>Languages</h4>
            <ul>
              {el.languages.map((lang, index) => (
                <li key={index}>{lang.name}</li>
              ))}
            </ul>
            <div>
              <img height="100" width="100" alt="flag" src={el.flag}></img>
            </div>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div>
      {props.countries.map((el) => (
        <div key={el.numericCode}> {el.name}</div>
      ))}
    </div>
  );
};
