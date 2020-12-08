import React from "react";
import { Container } from "react-bootstrap";
import Filters from "./components/filters/Filters";
import NavigationBar from "./components/navigationBar/NavigationBar";
import Result from "./components/Result";

function App() {
  return (
    <Container>
      <NavigationBar />
      <Filters />
      <div className="App">
        <Result />
      </div>
    </Container>
  );
}

export default App;
