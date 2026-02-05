const KEY = "ideaflow_saved_ideas";

export function getSavedIdeas() {
    const data = localStorage.getItem(KEY);
    return data ? JSON.parse(data) : [];
}

export function saveIdea(idea) {
    const ideas = getSavedIdeas();
    if (!ideas.find(i => i.id === idea.id)) {
        ideas.push({
            ...idea,
            savedAt: new Date().toISOString()
        });
        localStorage.setItem(KEY, JSON.stringify(ideas));
    }
}

export function removeIdea(id) {
    const ideas = getSavedIdeas().filter(i => i.id !== id);
    localStorage.setItem(KEY, JSON.stringify(ideas));
}

export function isIdeaSaved(id) {
    return getSavedIdeas().some(i => i.id === id);
}

export function getSavedIdeaById(id) {
    return getSavedIdeas().find(i => i.id === id);
}
