import React from "react";
import ReactDOM from "react-dom/client";
import { TamboProvider } from "@tambo-ai/react";
import App from "./App";
import IdeaOverviewUI from "./components/IdeaOverviewUI";
import FeaturesUI from "./components/FeaturesUI";
import UserFlowUI from "./components/UserFlowUI";
import TechStackUI from "./components/TechStackUI";
import RoadmapUI from "./components/RoadmapUI";

// Component registration with descriptive hints for the AI
const components = [
  {
    name: "IdeaOverviewUI",
    component: IdeaOverviewUI,
    propsSchema: IdeaOverviewUI.propsSchema,
    description: "Provides a high-level summary of the product idea. Always show this first."
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
  }
];

ReactDOM.createRoot(document.getElementById("root")).render(
  <TamboProvider
    apiKey={import.meta.env.VITE_TAMBO_API_KEY}
    components={components}
  >
    <App />
  </TamboProvider>
);
