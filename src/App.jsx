import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import "./index.css";

import BackgroundLayout from "./components/BackgroundLayout";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HeroPage from "./pages/HeroPage";
import ResultsPage from "./pages/ResultsPage";
import HowItWorksPage from "./pages/HowItWorksPage";
import ExamplesPage from "./pages/ExamplesPage";
import WhyIdeaFlowPage from "./pages/WhyIdeaFlowPage";

export default function App() {
  const [inputValue, setInput] = useState("");
  const navigate = useNavigate();

  const handleGenerate = (prompt) => {
    if (!prompt.trim()) return;
    navigate(`/search/${encodeURIComponent(prompt)}`);
  };

  return (
    <BackgroundLayout>
      <Header
        onSubmit={handleGenerate}
        setInput={setInput}
        inputValue={inputValue}
      />
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={<HeroPage setInput={setInput} inputValue={inputValue} onSubmit={handleGenerate} />}
          />
          <Route
            path="/how-it-works"
            element={<HowItWorksPage />}
          />
          <Route
            path="/examples"
            element={<ExamplesPage onSubmit={handleGenerate} />}
          />
          <Route
            path="/why-ideaflow"
            element={<WhyIdeaFlowPage />}
          />
          <Route
            path="/search/:query"
            element={<ResultsPage setInput={setInput} inputValue={inputValue} />}
          />
        </Routes>
      </div>
      <Footer />
    </BackgroundLayout>
  );
}
