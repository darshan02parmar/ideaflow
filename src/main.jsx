import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { TamboProvider } from "@tambo-ai/react";
import App from "./App";
import IdeaOverviewUI from "./components/IdeaOverviewUI";
import ProblemsWeSolveUI from "./components/ProblemsWeSolveUI";
import FeaturesUI from "./components/FeaturesUI";
import UserFlowUI from "./components/UserFlowUI";
import TechStackUI from "./components/TechStackUI";
import RoadmapUI from "./components/RoadmapUI";
import BusinessModelUI from "./components/BusinessModelUI";

// Component registration with descriptive hints for the AI
const components = [
  {
    name: "IdeaOverviewUI",
    component: IdeaOverviewUI,
    propsSchema: IdeaOverviewUI.propsSchema,
    description: "Provides a high-level summary of the product idea. Always show this first."
  },
  {
    name: "ProblemsWeSolveUI",
    component: ProblemsWeSolveUI,
    propsSchema: ProblemsWeSolveUI.propsSchema,
    description: "Highlights the top user pain points the product solves."
  },
  {
    name: "FeaturesUI",
    component: FeaturesUI,
    propsSchema: FeaturesUI.propsSchema,
    description: "Lists the main features and functionalities of the product."
  },
  {
    name: "UserFlowUI",
    component: UserFlowUI,
    propsSchema: UserFlowUI.propsSchema,
    description: "Details the step-by-step user journey or flow through the app."
  },
  {
    name: "TechStackUI",
    component: TechStackUI,
    propsSchema: TechStackUI.propsSchema,
    description: "Suggests the technical stack (frontend, backend, database) for the project."
  },
  {
    name: "RoadmapUI",
    component: RoadmapUI,
    propsSchema: RoadmapUI.propsSchema,
    description: "Outlines the MVP development phases and milestones. Always show this last."
  },
  {
    name: "BusinessModelUI",
    component: BusinessModelUI,
    propsSchema: BusinessModelUI.propsSchema,
    description: "Describes the monetization model and revenue streams."
  }
];

ReactDOM.createRoot(document.getElementById("root")).render(
  <TamboProvider
    apiKey={import.meta.env.VITE_TAMBO_API_KEY}
    components={components}
  >
    <Router>
      <App />
    </Router>
  </TamboProvider>
);
