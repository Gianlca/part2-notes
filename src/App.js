import { Footer } from "./layouts/Footer";
import { Countries } from "./components/Countries";
import Notes from "./components/Notes";
import Phonebook from "./components/Phonebook";

const App = ({ notex }) => {
  return (
    <div>
      <h1>Notes</h1>
      <Notes />
      <h3>Countries Api</h3>
      <Countries />
      <div>
        <Phonebook />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default App;
