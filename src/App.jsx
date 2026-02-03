import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "./index.css";

import BackgroundLayout from "./components/BackgroundLayout";
import HeroPage from "./pages/HeroPage";
import ResultsPage from "./pages/ResultsPage";

export default function App() {
  const [inputValue, setInput] = useState("");

  return (
    <Router>
      <BackgroundLayout>
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={<HeroPage setInput={setInput} inputValue={inputValue} />}
            />
            <Route
              path="/search/:query"
              element={<ResultsPage setInput={setInput} inputValue={inputValue} />}
            />
          </Routes>
        </div>
      </BackgroundLayout>
    </Router>
  );
}
