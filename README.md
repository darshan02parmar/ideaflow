# 🌌IdeaFlow
### Generative UI Product Architecture Tool powered by Tambo

<div align="center">
  
<p align="center">
  <img src="/public/ideaflow.png" alt="IdeaFlow Banner" width="100%" />
</p>

**⭐Interface at the speed of thought.**


[![Built with Tambo](https://img.shields.io/badge/Built%20with-Tambo%20AI-blue)](https://tambo.co)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-Fast%20Build-646CFF?logo=vite)](https://vitejs.dev/)


*A hackathon project for "The UI Strikes Back" by WeMakeDevs*

<!-- <p align="center">
  <b>⭐Interface at the speed of thought.</b>
</p> -->

</div>

IdeaFlow is an AI-powered product architecture tool that transforms erratic startup ideas into structured, professional product blueprints in seconds. It combines high-performance generative AI with a premium, SaaS-grade cinema dashboard experience.


## 🚀 Key Features

### 🧠 Generative Product Intelligence
- **Streaming Blueprints**: Watch your product plan unfold in real-time with an immersive typing effect.
- **Section Regeneration**: Not feeling a specific feature? Hit "Regenerate" to pivot specific sections like Tech Stack or User Flows without losing the whole plan.
- **Product Architecture**: Generates comprehensive Product Briefs, User Journeys, Tech Stacks, MVP Roadmaps, and Business Models.

### 💾 Blueprint Management
- **Local Persistence**: Save your favorite blueprints locally with zero-backend overhead.
- **Blueprint Gallery**: Access all your saved ideas in a dedicated, high-performance gallery view.
- **PDF Export**: Generate professional PDF reports of your product plans for instant sharing with stakeholders.
- **AI-Guided Editing:** Saved blueprints remain fully editable, with on-demand AI refinement to enhance clarity and structure without overriding user intent.
- **Editable Blueprints**: Saved plans are fully editable, allowing founders to manually refine AI output into their own execution-ready strategy.


### 🎨 Premium UI/UX (The Qupe Design System)
- **Fluid Hyperspeed**: A persistent WebGL-powered starfield background that adapts as you navigate.
- **Pro Section Headers**: Visual consistency using Lucide-react icons, signature gradient dividers, and high-contrast typography.
- **Dynamic Guidance**: Interactive search inputs with context-aware placeholders and micro-proof lines for immediate value clarity.
- **Animated Micros**: Tactile hover effects, logo glows, and smooth page transitions that make the app feel alive.

## 🛠️ Tech Stack

- **Core**: [React 19](https://react.dev/), [Vite](https://vitejs.dev/)
- **AI Backend**: [@tambo-ai/react](https://tambo.ai/) (Real-time streaming interface)
- **Visuals**: [Three.js](https://threejs.org/), [Lucide React](https://lucide.dev/)
- **Navigation**: [React Router DOM v7](https://reactrouter.com/)
- **Utilities**: [html2pdf.js](https://ekoopmans.github.io/html2pdf.js/), [Local Storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

## ⚡ Getting Started

### Prerequisites

- React.js (v18+)
- A Tambo AI API Key

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/ideaflow.git
    cd ideaflow
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment**
    Create a `.env` file in the root directory:
    ```env
    VITE_TAMBO_API_KEY=your_api_key_here
    ```

4.  **Launch Dashboard**
    ```bash
    npm run dev
    ```

## 🏗️ Architecture

### High-Level Flow
```
┌──────────────┐
│     User     │
│   (Browser)  │
└──────┬───────┘
       │ Product idea (natural language)
       ▼
┌────────────────────┐
│   React + Vite UI  │
│  (Client Layer)    │
└──────┬─────────────┘
       │ sendThreadMessage()
       ▼
┌────────────────────┐
│      Tambo AI      │
│ Generative UI Engine│
└──────┬─────────────┘
       │ Structured component props
       ▼
┌──────────────────────────────┐
│ Registered UI Components     │
│ IdeaOverviewUI               │
│ FeaturesUI                   │
│ UserFlowUI                   │
│ TechStackUI                  │
│ RoadmapUI                    │
│ BusinessModelUI              │
└──────┬───────────────────────┘
       │ Rendered dynamically
       ▼
┌────────────────────┐
│   Structured UI     │
│ Product Blueprint   │
└────────────────────┘

```

## 🔄 Demo Flow

1. **Input**: Type `Build a smart parking system`
   - → Full product blueprint generated

2. **Refine**: Click **Regenerate** on Tech Stack
   - → Only that section updates

3. **Save**: Click **Save Idea**
   - → Stored locally

4. **Edit**: Edit a section → Click **Improve with AI**
   - → AI refines the content

5. **Export**: Click **Export PDF**
   - → Professional report generated

## 🧠 Key Design Principle

> **User Idea → AI → Structured Data → UI Components**

- **AI** decides the content
- **React** decides the experience

This is the core of **Generative UI with Tambo**.


## 🌌 The "IdeaFlow" Philosophy

Startups shouldn't feel like spreadsheets. They should feel like *software*. IdeaFlow is designed to make the messy planning phase feel as fast and exciting as the actual building process.

---

*Crafted for founders who think at the speed of light.*

## 📧 Contact

**Darshan Parmar** - www.linkedin.com/in/parmar-darshan
