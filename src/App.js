import React from "react";
import { Container } from "react-bootstrap";
import Result from "./components/Result";

function App() {
  return (
    <Container>
      <div class="pb-2 mt-4 mb-2 border-bottom">React GitHub Issues</div>
      <div className="App">
        <Result />
      </div>
    </Container>
  );
}

export default App;
