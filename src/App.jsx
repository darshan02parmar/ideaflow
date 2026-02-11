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
import SavedIdeasPage from "./pages/SavedIdeasPage";
import SavedIdeaDetail from "./pages/SavedIdeaDetail";

export default function App() {
  const [inputValue, setInput] = useState("");
  const [isNavigating, setIsNavigating] = useState(false);
  const navigate = useNavigate();

  const handleGenerate = (prompt) => {
    if (!prompt.trim() || isNavigating) return;

    setIsNavigating(true);
    navigate(`/search/${encodeURIComponent(prompt)}`);

    // Safety timeout in case component doesn't unmount (e.g. navigation cancelled or rapid back)
    setTimeout(() => setIsNavigating(false), 2000);
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
            element={<HeroPage setInput={setInput} inputValue={inputValue} onSubmit={handleGenerate} isNavigating={isNavigating} />}
          />
          <Route
            path="/how-it-works"
            element={<HowItWorksPage />}
          />
          <Route
            path="/examples"
            element={<ExamplesPage onSubmit={handleGenerate} isNavigating={isNavigating} />}
          />
          <Route
            path="/why-ideaflow"
            element={<WhyIdeaFlowPage />}
          />
          <Route
            path="/saved"
            element={<SavedIdeasPage />}
          />
          <Route
            path="/saved/:id"
            element={<SavedIdeaDetail />}
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
